import { gql } from '@apollo/client';
import { CartItemType, CART_ITEMS_FRAGMENT } from './cartItemsFragment';

export interface GetCartDataType {
  customerCart: CartType;
}

export interface CartType {
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

export const GET_CART = gql`
  query GetCart {
    customerCart {
      id
      ...CartItemsFragment
      prices {
        grandTotal: grand_total {
          value
          currency
        }
      }
      totalQuantity: total_quantity
    }
  }
  ${CART_ITEMS_FRAGMENT}
`;
