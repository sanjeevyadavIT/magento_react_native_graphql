import { gql } from '@apollo/client';

export interface CreateCustomerTokenDataType {
  generateCustomerToken: {
    token: string;
  };
}

export interface CreateCustomerTokenVars {
  email: string;
  password: string;
}

export const CREATE_CUSTOMER_TOKEN = gql`
  mutation CreateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;
