import { gql } from '@apollo/client';
import {
  MEDIA_GALLERY_FRAGMENT,
  MediaGalleryItemType,
} from './mediaGalleryFragment';
import { PriceRangeType, PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';

export interface ConfigurableOptionType {
  id: number;
  label: string;
  position: number;
  attributeCode: string;
  values: Array<ConfigurableProductOptionValueType>;
}

export interface ConfigurableProductOptionValueType {
  label: string;
  valueIndex: number;
  swatchData: {
    value: string;
    __typename: 'ImageSwatchData' | 'TextSwatchData' | 'ColorSwatchData';
  };
}

export interface ConfigurableProductVariant {
  attributes: Array<ConfigurableProductVariantAttribute>;
  product: ConfigurableProductVariantProduct;
}

export interface ConfigurableProductVariantAttribute {
  code: string;
  valueIndex: number;
}

export interface ConfigurableProductVariantProduct {
  sku: string;
  mediaGallery: Array<MediaGalleryItemType>;
  priceRange: PriceRangeType;
}

export const CONFIGURABLE_PRODUCT_FRAGMENT = gql`
  fragment ConfigurableProduct on ConfigurableProduct {
    configurableOptions: configurable_options {
      id
      label
      position
      attributeCode: attribute_code
      values {
        label
        valueIndex: value_index
        swatchData: swatch_data {
          value
        }
      }
    }
    variants {
      attributes {
        code
        valueIndex: value_index
      }
      product {
        sku
        ...MediaGallery
        ...ProductPrice
      }
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
  ${PRODUCT_PRICE_FRAGMENT}
`;
