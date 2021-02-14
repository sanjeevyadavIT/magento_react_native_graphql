import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AsyncStorageKeys,
  saveCustomerToken,
  loadCustomerToken,
} from '../storage';

describe('storage.ts', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('should save customer token', async () => {
    // Setup
    const customerToken = '123abc';

    // Exercise
    const status = await saveCustomerToken(customerToken);

    // Verify
    expect(status).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      AsyncStorageKeys.CustomerToken,
      customerToken,
    );
  });

  test('should load customer token', async () => {
    // setup
    const customerToken = 'abc123';
    await AsyncStorage.setItem(AsyncStorageKeys.CustomerToken, customerToken);

    // Exercise
    const result = await loadCustomerToken();

    // Verify
    expect(result).toBe(customerToken);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      AsyncStorageKeys.CustomerToken,
    );
  });

  test('should remove customer token', async () => {
    // setup
    const customerToken = 'abc123';
    await AsyncStorage.setItem(AsyncStorageKeys.CustomerToken, customerToken);

    // Exercise
    const result = await saveCustomerToken(null);

    // Verify
    expect(result).toBe(true);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      AsyncStorageKeys.CustomerToken,
    );
  });
});
