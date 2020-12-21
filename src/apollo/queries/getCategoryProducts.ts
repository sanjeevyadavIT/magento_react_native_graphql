import { gql } from '@apollo/client';

export interface CategoryProductsDataType {
  products: {
    total_count: number;
    items: Array<CategoryProductType>;
  };
}

export interface CategoryProductType {
  id: number;
  name: string;
  small_image: {
    url: String;
  };
  price_range: CatgeoryProductPriceType;
}

interface CatgeoryProductPriceType {
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
