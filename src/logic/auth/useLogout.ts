import { getApolloClient } from '../../apollo/client';
import { IS_LOGGED_IN } from '../../apollo/queries/isLoggedIn';
import { saveCustomerToken } from '../utils/storage';

interface Result {
  logout(): Promise<any>;
}

export const useLogout = (): Result => {
  const logout = async () => {
    try {
      // clear apollo cache
      await saveCustomerToken(null);
      const client = await getApolloClient();
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: false,
        },
      });
      client.resetStore();
    } catch {}
  };
  return {
    logout,
  };
};
