import { gql } from '@apollo/client';

export interface CreateCustomerDataType {
  createCustomerV2: {
    customer: {
      email: string;
    };
  };
}

export interface CreateCustomerVars {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createCustomerV2(
      input: {
        firstname: $firstName
        lastname: $lastName
        email: $email
        password: $password
      }
    ) {
      customer {
        email
      }
    }
  }
`;
