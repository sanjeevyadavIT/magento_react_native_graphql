import { gql } from '@apollo/client';

export interface IsLoggedInDataType {
  isLoggedIn: boolean | undefined;
}

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
