import { gql } from '@apollo/client';

export interface GetCustomerDataType {
  customer: CustomerType;
}

export interface CustomerType {
  email: string;
  firstName: string;
  lastName: string;
}

export const GET_CUSTOMER = gql`
  query GetCustomer {
    customer {
      email
      firstName: firstname
      lastName: lastname
    }
  }
`;
