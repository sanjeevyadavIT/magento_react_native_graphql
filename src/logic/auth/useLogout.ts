import { getApolloClient } from '../../apollo/client';
import { IS_LOGGED_IN } from '../../apollo/queries/isLoggedIn';
import { AsyncStorageKeys } from '../../constants';
import { removeData } from '../utils/asyncStorageHelper';

interface Result {
  logout(): Promise<any>;
}

export const useLogout = (): Result => {
  const logout = async () => {
    try {
      // clear apollo cache
      const client = await getApolloClient();
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: false,
        },
      });
      await removeData(AsyncStorageKeys.CUSTOMER_TOKEN);
    } catch {}
  };
  return {
    logout,
  };
};
