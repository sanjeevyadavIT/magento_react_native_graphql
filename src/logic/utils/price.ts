import { currencySymbols } from '../../../magento.config';
import { PriceRangeType } from '../../apollo/queries/getCategoryProducts';

export const getCurrencySymbolFromCode = (currencyCode: string) => {
  return currencySymbols[currencyCode] ?? currencyCode;
};

export const getPriceStringFromPriceRange = (
  priceRange: PriceRangeType,
): string => {
  return `${getCurrencySymbolFromCode(
    priceRange.maximum_price.final_price.currency,
  )} ${priceRange.maximum_price.final_price.value}`;
};
