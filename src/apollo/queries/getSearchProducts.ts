import { gql } from '@apollo/client';
import { CategoryProductsDataType } from './getCategoryProducts';
import { PRODUCTS_FRAGMENT } from './productsFragment';

export interface GetSearchProductsVars {
  searchText: string;
  pageSize: number;
  currentPage: number;
}

export type SearchProductsDataType = CategoryProductsDataType;

export const GET_SEARCH_PRODUCTS = gql`
  query GetSearchProducts(
    $searchText: String!
    $pageSize: Int!
    $currentPage: Int!
  ) {
    products(
      search: $searchText
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      totalCount: total_count
      ...ProductListFragment
    }
  }
  ${PRODUCTS_FRAGMENT}
`;
