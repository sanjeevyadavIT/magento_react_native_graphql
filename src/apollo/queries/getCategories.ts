import { gql } from '@apollo/client';

export interface CategoriesDataType {
  categoryList: CategoryListType[];
}

interface CategoryListType {
  id: number;
  children: CategoryType[];
}

interface CatgeoryProductPreviewImageType {
  items: Array<{
    small_image: {
      url: String;
    };
  }>;
}

export interface CategoryType {
  id: number;
  name: string;
  product_count: number;
  children_count: string;
  image: string;
  /**
   * In case catgeory doesn't contain image,
   * use one of the product's image inside the catgeory
   */
  productPreviewImage: CatgeoryProductPreviewImageType;
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
