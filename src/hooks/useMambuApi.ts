import { useState } from 'react';
import { mambuApi } from '../services/mambuApi';

export const useMambuApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchPayments = async (clientId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const payments = await mambuApi.getPayments(clientId);
      return payments;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchPayments,
    loading,
    error
  };
};
