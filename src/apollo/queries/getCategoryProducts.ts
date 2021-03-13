import { gql } from '@apollo/client';
import { ProductInListType, PRODUCTS_FRAGMENT } from './productsFragment';

export interface GetCategoryProductsVars {
  id: string;
  pageSize: number;
  currentPage: number;
  price?: SortEnum;
  name?: SortEnum;
}

export interface CategoryProductsDataType {
  products: {
    totalCount: number;
    items: Array<ProductInListType>;
  };
}

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const GET_CATGEORY_PRODUCTS = gql`
  query GetCategoryProducts(
    $id: String
    $pageSize: Int!
    $currentPage: Int!
    $price: SortEnum
    $name: SortEnum
  ) {
    products(
      filter: { category_id: { eq: $id } }
      pageSize: $pageSize
      sort: { price: $price, name: $name }
      currentPage: $currentPage
    ) {
      totalCount: total_count
      ...ProductListFragment
    }
  }
  ${PRODUCTS_FRAGMENT}
`;
