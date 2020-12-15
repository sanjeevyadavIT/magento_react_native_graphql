import { ApolloClient, InMemoryCache } from '@apollo/client';
import { magentoConfig } from '../../magento.config';

export const apolloClient = new ApolloClient({
  uri: `${magentoConfig.url}/graphql`,
  cache: new InMemoryCache(),
});
