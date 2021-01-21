import { gql } from '@apollo/client';

export interface ProductInListType {
  id: number;
  sku: string;
  name: string;
  small_image: {
    url: String;
  };
  price_range: PriceRangeType;
}

export interface PriceRangeType {
  maximum_price: {
    final_price: {
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
      small_image {
        url
      }
      price_range {
        maximum_price {
          final_price {
            currency
            value
          }
        }
      }
    }
  }
`;
