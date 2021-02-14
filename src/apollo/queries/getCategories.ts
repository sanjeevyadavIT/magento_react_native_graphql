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
  productCount: number;
  childrenCount: string;
  image: string;
  /**
   * In case category doesn't contain image,
   * use one of the product's image inside the category
   */
  productPreviewImage: CategoryProductPreviewImageType;
}

interface CategoryProductPreviewImageType {
  items: Array<{
    smallImage: {
      url: string;
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
        productCount: product_count
        childrenCount: children_count
        image
        productPreviewImage: products(pageSize: 1) {
          items {
            smallImage: small_image {
              url
            }
          }
        }
      }
    }
  }
`;
