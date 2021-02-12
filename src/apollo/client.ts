import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { magentoConfig } from '../../magento.config';
import { loadCustomerToken } from '../logic';
import { IS_LOGGED_IN } from './queries/isLoggedIn';
import possibleTypes from './data/possibleTypes.json';

let _client: ApolloClient<any>;

export async function getApolloClient(): Promise<ApolloClient<any>> {
  if (_client) {
    return _client;
  }

  const cache = new InMemoryCache({
    possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          products: {
            // Cache separate results based on
            // any of this field's arguments.
            keyArgs: ['search', 'filter'],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args: { currentPage } }) {
              if (currentPage === 1) {
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

  const customerToken = await loadCustomerToken();

  if (customerToken !== null) {
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
    const token = await loadCustomerToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token !== null ? `Bearer ${token}` : '',
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
