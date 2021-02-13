import { gql } from '@apollo/client';
import {
  BasicCartDetailsType,
  BASIC_CART_DETAILS_FRAGMENT,
} from './basicCartFragment';

export interface GetCartDataType {
  customerCart: CartType;
}

export type CartType = BasicCartDetailsType;

export const GET_CART = gql`
  query GetCart {
    customerCart {
      ...BasicCartDetailsFragment
    }
  }
  ${BASIC_CART_DETAILS_FRAGMENT}
`;
