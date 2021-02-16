import {
  ApolloClient,
  InMemoryCache as Cache,
  ApolloLink,
} from '@apollo/client';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLogout } from '../useLogout';
import * as apolloClient from '../../../apollo/client';
import * as storage from '../../utils/storage';
import { IS_LOGGED_IN } from '../../../apollo/queries/isLoggedIn';

describe('useLogout', () => {
  const customerToken = 'dgFt1#$2i1j';

  beforeEach(async () => {
    const client = new ApolloClient({
      cache: new Cache({
        addTypename: false,
      }),
      link: new ApolloLink(),
    });
    // Pre-fill apollo-cache to mimic logged in user state
    client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
      },
    });
    expect(client.readQuery({ query: IS_LOGGED_IN })).toEqual({
      isLoggedIn: true,
    });
    jest.spyOn(apolloClient, 'getApolloClient').mockResolvedValue(client);
    jest.spyOn(storage, 'saveCustomerToken');
    jest.spyOn(storage, 'loadCustomerToken');
    // Pre-fill the AsyncStorage with customer token to mimic logged in user state
    await storage.saveCustomerToken(customerToken);
    const customerTokenFromCache = await storage.loadCustomerToken();
    expect(customerTokenFromCache).toBe(customerToken);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should clear cache onLogout()', async () => {
    // Setup
    const client = await apolloClient.getApolloClient();
    expect(client).toBeDefined();

    const { result } = renderHook(() => useLogout());
    expect(typeof result.current.logout).toBe('function');

    // Exercise
    await act(async () => {
      await result.current.logout();
    });

    // Verify
    expect(storage.saveCustomerToken).toHaveBeenCalledWith(null);
    const customerTokenFromCache = await storage.loadCustomerToken();
    expect(customerTokenFromCache).toBeNull();
    expect(client.readQuery({ query: IS_LOGGED_IN })).toBeNull();
  });
});
