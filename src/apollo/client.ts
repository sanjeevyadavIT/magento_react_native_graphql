import { ApolloClient, InMemoryCache } from '@apollo/client';
import { magentoConfig } from '../../magento.config';
import { AsyncStorageKeys } from '../constants';
import { getData } from '../logic/utils/asyncStorageHelper';
import { IS_LOGGED_IN } from './queries/isLoggedIn';

let _client: ApolloClient<any>;

export async function getApolloClient(): Promise<ApolloClient<any>> {
  if (_client) {
    return _client;
  }

  const cache = new InMemoryCache();

  const customerToken = await getData(AsyncStorageKeys.CUSTOMER_TOKEN);

  if (customerToken != null) {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
      },
    });
  }

  const client = new ApolloClient({
    uri: `${magentoConfig.url}/graphql`,
    cache,
  });

  _client = client;

  return client;
}
