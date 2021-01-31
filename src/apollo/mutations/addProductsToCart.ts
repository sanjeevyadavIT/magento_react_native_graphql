import { gql } from '@apollo/client';

export interface AddProductsToCartDataType {
  addProductsToCart: {
    cart: {
      items: Array<{
        id: string;
        product: {
          name: string;
          sku: string;
        };
        quantity: number;
      }>;
    };
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
        items {
          id
          product {
            name
            sku
          }
          quantity
        }
      }
    }
  }
`;
