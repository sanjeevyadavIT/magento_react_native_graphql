import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { magentoConfig } from '../../magento.config';
import { AsyncStorageKeys } from '../constants';
import { getData } from '../logic/utils/asyncStorageHelper';
import { IS_LOGGED_IN } from './queries/isLoggedIn';

let _client: ApolloClient<any>;

export async function getApolloClient(): Promise<ApolloClient<any>> {
  if (_client) {
    return _client;
  }

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['search'],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args: { search, currentPage } }) {
              if (currentPage === 1 || !search) {
                return incoming;
              }
              const _existing = existing ?? { items: [] };
              const _incoming = incoming ?? { items: [] };
              return {
                ..._existing,
                ..._incoming,
                items: [..._existing.items, ..._incoming.items],
              };
            },
          },
        },
      },
    },
  });

  const customerToken = await getData(AsyncStorageKeys.CUSTOMER_TOKEN);

  if (customerToken != null) {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
      },
    });
  }

  const httpLink = createHttpLink({
    uri: `${magentoConfig.url}/graphql`,
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await getData(AsyncStorageKeys.CUSTOMER_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

  _client = client;

  return client;
}
