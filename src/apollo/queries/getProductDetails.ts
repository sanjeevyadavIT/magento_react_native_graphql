import { gql } from '@apollo/client';
import {
  ConfigurableOptionType,
  CONFIGURABLE_PRODUCT_FRAGMENT,
} from './configurableProductFragment';
import {
  MEDIA_GALLERY_FRAGMENT,
  MediaGalleryItemType,
} from './mediaGalleryFragment';
import { PriceRangeType } from './productsFragment';

export interface GetProductDetailsVars {
  sku: string;
}

export interface ProductDetailsDataType {
  products: {
    items: Array<ProductDetailsType>;
  };
}

export type ProductDetailsType =
  | SimpleProductDetailsType
  | ConfigurableProductDetailsType
  | GroupedProductDetailsType;

export interface ProductInterfaceDetailsType {
  id: number;
  sku: string;
  name: string;
  description: {
    html: string;
  };
  priceRange: PriceRangeType;
  mediaGallery: Array<MediaGalleryItemType>;
}

export interface SimpleProductDetailsType extends ProductInterfaceDetailsType {
  type: ProductTypeEnum.SIMPLE;
}

export interface ConfigurableProductDetailsType
  extends ProductInterfaceDetailsType {
  type: ProductTypeEnum.CONFIGURED;
  configurableOptions: Array<ConfigurableOptionType>;
}

export interface GroupedProductDetailsType extends ProductInterfaceDetailsType {
  type: ProductTypeEnum.GROUPED;
}

export enum ProductTypeEnum {
  SIMPLE = 'SimpleProduct',
  GROUPED = 'GroupedProduct',
  CONFIGURED = 'ConfigurableProduct',
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
        type: __typename
        priceRange: price_range {
          maximumPrice: maximum_price {
            finalPrice: final_price {
              currency
              value
            }
          }
        }
        ...MediaGallery
        ...ConfigurableProduct
      }
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;
