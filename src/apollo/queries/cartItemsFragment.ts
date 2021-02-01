import { gql } from '@apollo/client';

export interface CartItemType {
  id: number;
  product: {
    sku: string;
    name: string;
    small_image: {
      url: String;
    };
  };
  prices: {
    rowTotal: {
      currency: string;
      value: number;
    };
  };
  quantity: number;
}

export const CART_ITEMS_FRAGMENT = gql`
  fragment CartItemsFragment on Cart {
    items {
      id
      prices {
        rowTotal: row_total {
          currency
          value
        }
      }
      product {
        name
        sku
        small_image {
          url
        }
      }
      quantity
    }
  }
`;
