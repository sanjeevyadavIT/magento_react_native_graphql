import { gql } from '@apollo/client';

export interface PriceRangeType {
  maximumPrice: {
    finalPrice: {
      currency: string;
      value: number;
    };
  };
}

export const PRODUCT_PRICE_FRAGMENT = gql`
  fragment ProductPrice on ProductInterface {
    priceRange: price_range {
      maximumPrice: maximum_price {
        finalPrice: final_price {
          value
          currency
        }
      }
    }
  }
`;
