import { getApolloClient } from '../../apollo/client';
import { saveCustomerToken } from '../utils/storage';

interface Result {
  logout(): Promise<any>;
}

export const useLogout = (): Result => {
  const logout = async () => {
    try {
      // clear apollo cache
      const client = await getApolloClient();
      client.resetStore();
      await saveCustomerToken(null);
    } catch {}
  };
  return {
    logout,
  };
};
