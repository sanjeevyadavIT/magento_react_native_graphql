import { gql } from '@apollo/client';

export interface CreateCartDataType {
  cartId: string;
}

export const CREATE_CART = gql`
  mutation createCart {
    cartId: createEmptyCart
  }
`;
