import { gql } from '@apollo/client';

export interface ProductInListType {
  id: number;
  sku: string;
  name: string;
  smallImage: {
    url: string;
  };
  priceRange: PriceRangeType;
}

export interface PriceRangeType {
  maximumPrice: {
    finalPrice: {
      currency: string;
      value: number;
    };
  };
}

export const PRODUCTS_FRAGMENT = gql`
  fragment ProductListFragment on Products {
    items {
      id
      sku
      name
      smallImage: small_image {
        url
      }
      priceRange: price_range {
        maximumPrice: maximum_price {
          finalPrice: final_price {
            currency
            value
          }
        }
      }
    }
  }
`;
