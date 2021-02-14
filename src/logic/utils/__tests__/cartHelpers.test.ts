import { getCartCount } from '../cartHelpers';

describe('cartHelpers.js', () => {
  describe('getCartCount()', () => {
    test('should return empty string on false values', () => {
      // Setup
      const falseValues = [undefined, 0];

      // Exercise
      const resultArray = falseValues.map(value => getCartCount(value));

      // verify
      resultArray.forEach(result => expect(result).toBe(''));
    });

    test('should return string for truthy values', () => {
      // Setup
      const cartCount1 = 5;
      const cartCount2 = 100;
      const cartCount3 = 101;
      const expectedResult1 = '5';
      const expectedResult2 = '100';
      const expectedResult3 = '100+';

      // Exercise
      const result1 = getCartCount(cartCount1);
      const result2 = getCartCount(cartCount2);
      const result3 = getCartCount(cartCount3);

      // verify
      expect(result1).toBe(expectedResult1);
      expect(result2).toBe(expectedResult2);
      expect(result3).toBe(expectedResult3);
    });
  });
});
