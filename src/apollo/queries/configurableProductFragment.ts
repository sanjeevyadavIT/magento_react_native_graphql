import { gql } from '@apollo/client';

export interface ConfigurableOptionType {
  id: number;
  label: string;
  position: number;
  values: Array<ValueType>;
}

export interface ValueType {
  label: String;
  valueIndex: number;
}

export const CONFIGURABLE_PRODUCT_FRAGMENT = gql`
  fragment ConfigurableProduct on ConfigurableProduct {
    configurableOptions: configurable_options {
      id
      label
      position
      values {
        label
        valueIndex: value_index
      }
    }
  }
`;
