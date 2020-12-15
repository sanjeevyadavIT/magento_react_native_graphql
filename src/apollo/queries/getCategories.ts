import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories($id: String) {
    categoryList(filters: { ids: { eq: $id } }) {
      id
      name
      children_count
      product_count
      children {
        id
        name
        product_count
        children_count
        children {
          id
          name
          product_count
        }
      }
    }
  }
`;
