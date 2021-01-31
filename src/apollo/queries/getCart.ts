import { gql } from '@apollo/client';

export interface GetCartDataType {
  customerCart: CartType;
}

export interface CartType {
  id: string;
  totalQuantity: number;
}

export const GET_CART = gql`
  query GetCart {
    customerCart {
      id
      totalQuantity: total_quantity
    }
  }
`;
