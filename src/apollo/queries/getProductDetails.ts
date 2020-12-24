import { gql } from '@apollo/client';
import {
  MEDIA_GALLERY_FRAGMENT,
  MediaGalleryItemType,
} from './mediaGalleryFragment';

export interface ProductDetailsDataType {
  products: {
    items: Array<ProductDetailsType>;
  };
}

export interface ProductDetailsType {
  id: number;
  sku: string;
  name: string;
  media_gallery: Array<MediaGalleryItemType>;
}

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: String) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        sku
        name
        ...MediaGallery
      }
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
`;
