import {
  getCurrencySymbolFromCode,
  getPriceStringFromPriceRange,
} from './price';
import { currencySymbols } from '../../../magento.config';

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

  describe('getPriceStringFromPriceRange()', () => {
    test('should return correct string', () => {
      // Setup
      const currencyCode = 'USD';
      const price = 29.99;
      const priceRange = {
        maximum_price: {
          final_price: {
            currency: currencyCode,
            value: price,
          },
        },
      };
      const expectedResult = `${currencySymbols[currencyCode]} ${price}`;

      // Exercise
      const result = getPriceStringFromPriceRange(priceRange);

      // Verify
      expect(result).toBe(expectedResult);
    });
  });
});
