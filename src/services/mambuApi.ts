import axios from 'axios';
import { MAMBU_CONFIG } from '../config/mambu';
import { Payment, PaymentSearchFilters } from '../types/payment';

class MambuApi {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: MAMBU_CONFIG.baseUrl,
      auth: MAMBU_CONFIG.auth,
      headers: MAMBU_CONFIG.headers
    });
  }

  async getPayments(accountId: string, filters: PaymentSearchFilters) {
    try {
      const response = await this.client.get('/deposits', {
        params: {
          accountId,
          type: filters.type,
          valueDate: `${filters.startDate}..${filters.endDate}`,
          isAdjusted: filters.isAdjusted,
          detailsLevel: 'FULL',
          view: 'APPLIED_PAYMENTS'
        }
      });
      return this.transformPayments(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'] || 5;
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return this.getPayments(accountId, filters);
        }
        throw new Error(`Mambu API Error: ${error.response?.data?.errors?.[0]?.message || error.message}`);
      }
      throw error;
    }
  }

  private transformPayments(data: any): Payment[] {
    return data.map((item: any) => ({
      accountHolderName: item.accountHolderName,
      accountName: item.accountName,
      accountId: item.accountId,
      groups: item.groups?.join(', ') || '',
      branchName: item.branchName,
      amount: item.amount,
      principalAmount: item.principalAmount,
      interestAmount: item.interestAmount,
      feesAmount: item.feesAmount,
      penaltyAmount: item.penaltyAmount,
      valueDate: item.valueDate,
      channel: item.channel,
      user: item.user
    }));
  }
}

export const mambuApi = new MambuApi();
