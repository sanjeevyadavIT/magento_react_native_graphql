import { currencySymbols } from '../../../magento.config';

export const getCurrencySymbolFromCode = (currencyCode: string) => {
  return currencySymbols[currencyCode] ?? currencyCode;
};

export const formatPrice = ({
  currency,
  value,
}: {
  currency: string;
  value: number;
}): string => `${getCurrencySymbolFromCode(currency)} ${value}`;
