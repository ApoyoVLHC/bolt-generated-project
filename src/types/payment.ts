export interface Payment {
  accountHolderName: string;
  accountName: string;
  accountId: string;
  groups: string;
  branchName: string;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  feesAmount: number;
  penaltyAmount: number;
  valueDate: string;
  channel: string;
  user: string;
}

export interface PaymentSearchFilters {
  type: string;
  startDate: string;
  endDate: string;
  isAdjusted: boolean;
}
