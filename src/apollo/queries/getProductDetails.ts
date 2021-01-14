import { gql } from '@apollo/client';
import {
  MEDIA_GALLERY_FRAGMENT,
  MediaGalleryItemType,
} from './mediaGalleryFragment';
import { PriceRangeType } from './getCategoryProducts';

export interface GetProductDetailsVars {
  sku: string;
}

export interface ProductDetailsDataType {
  products: {
    items: Array<ProductDetailsType>;
  };
}

export interface ProductDetailsType {
  id: number;
  sku: string;
  name: string;
  description: {
    html: string;
  };
  price_range: PriceRangeType;
  media_gallery: Array<MediaGalleryItemType>;
}

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: String) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        sku
        name
        description {
          html
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
          }
        }
        ...MediaGallery
      }
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
`;
