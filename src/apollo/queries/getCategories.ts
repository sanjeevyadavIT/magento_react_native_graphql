import { gql } from '@apollo/client';

export interface GetCategoriesVars {
  id: string;
}

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
  image: string;
  /**
   * In case category doesn't contain image,
   * use one of the product's image inside the category
   */
  productPreviewImage: CategoryProductPreviewImageType;
}

interface CategoryProductPreviewImageType {
  items: Array<{
    small_image: {
      url: String;
    };
  }>;
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
        image
        productPreviewImage: products(pageSize: 1) {
          items {
            small_image {
              url
            }
          }
        }
      }
    }
  }
`;
