import { gql } from '@apollo/client';

export interface CategoriesDataType {
  categoryList: CategoryListType[];
}

interface CategoryListType {
  id: number;
  children: CategoryType[];
}

export interface CategoryType {
  id: number;
  name: string;
  product_count: number;
  children_count: string;
}

export const GET_CATEGORIES = gql`
  query GetCategories($id: String) {
    categoryList(filters: { ids: { eq: $id } }) {
      id
      children {
        id
        name
        product_count
        children_count
      }
    }
  }
`;
