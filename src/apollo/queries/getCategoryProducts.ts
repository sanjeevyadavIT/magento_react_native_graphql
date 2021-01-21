import { gql } from '@apollo/client';
import { ProductInListType, PRODUCTS_FRAGMENT } from './productsFragment';

export interface GetCategoryProductsVars {
  id: string;
  pageSize: number;
  currentPage: number;
}

export interface CategoryProductsDataType {
  products: {
    total_count: number;
    items: Array<ProductInListType>;
  };
}

export const GET_CATGEORY_PRODUCTS = gql`
  query GetCategoryProducts($id: String, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: { category_id: { eq: $id } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      ...ProductListFragment
    }
  }
  ${PRODUCTS_FRAGMENT}
`;
