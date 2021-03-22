import { gql } from '@apollo/client';

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
  }
`;
