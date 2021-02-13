import { gql } from '@apollo/client';

export interface BasicCartDetailsType {
  id: string;
  items: Array<CartItemType>;
  prices: {
    grandTotal: {
      value: number;
      currency: string;
    };
  };
  totalQuantity: number;
}

export interface CartItemType {
  id: number;
  product: {
    sku: string;
    name: string;
    small_image: {
      url: string;
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

export const BASIC_CART_DETAILS_FRAGMENT = gql`
  fragment BasicCartDetailsFragment on Cart {
    id
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
    prices {
      grandTotal: grand_total {
        value
        currency
      }
    }
    totalQuantity: total_quantity
  }
`;
