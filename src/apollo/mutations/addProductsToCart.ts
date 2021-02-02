import { gql } from '@apollo/client';
import {
  BasicCartDetailsType,
  BASIC_CART_DETAILS_FRAGMENT,
} from '../queries/basicCartFragment';

export interface AddProductsToCartDataType {
  addProductsToCart: {
    cart: BasicCartDetailsType;
  };
}

export interface AddProductsToCartVars {
  cartId: string;
  cartItems: Array<CartItemInputType>;
}

export interface CartItemInputType {
  quantity: number;
  sku: string;
}

export const ADD_PRODUCTS_TO_CART = gql`
  mutation AddProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        ...BasicCartDetailsFragment
      }
    }
  }
  ${BASIC_CART_DETAILS_FRAGMENT}
`;
