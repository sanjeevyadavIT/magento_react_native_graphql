import { gql } from '@apollo/client';

export interface CategoryProductsDataType {
  products: {
    total_count: number;
    items: Array<CategoryProductType>;
  };
}

export interface CategoryProductType {
  id: number;
  sku: string;
  name: string;
  small_image: {
    url: String;
  };
  price_range: PriceRangeType;
}

export interface PriceRangeType {
  maximum_price: {
    final_price: {
      currency: string;
      value: number;
    };
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
      items {
        id
        sku
        name
        small_image {
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`;
