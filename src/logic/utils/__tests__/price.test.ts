import { getCurrencySymbolFromCode, formatPrice } from '../price';
import { currencySymbols } from '../../../../magento.config';

describe('price.js', () => {
  describe('getCurrencySymbolFromCode()', () => {
    test('should return correct currency symbol', () => {
      // Setup
      const currencyCode = 'USD';
      const expectedCurrencySymbol = currencySymbols[currencyCode];

      // Exercise
      const result = getCurrencySymbolFromCode(currencyCode);

      // verify
      expect(result).toBe(expectedCurrencySymbol);
    });

    test('should return currency code, if currency symbol not available', () => {
      // Setup
      const currencyCode = 'WWW';
      const expectedCurrencySymbol = 'WWW';

      // Exercise
      const result = getCurrencySymbolFromCode(currencyCode);

      // verify
      expect(result).toBe(expectedCurrencySymbol);
    });
  });

  describe('formatPrice()', () => {
    test('should return correct string', () => {
      // Setup
      const currencyCode = 'USD';
      const value = 29.99;
      const price = {
        currency: currencyCode,
        value,
      };
      const expectedResult = `${currencySymbols[currencyCode]} ${value}`;

      // Exercise
      const result = formatPrice(price);

      // Verify
      expect(result).toBe(expectedResult);
    });
  });
});
