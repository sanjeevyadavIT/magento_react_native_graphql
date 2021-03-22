import { useQuery, ApolloError } from '@apollo/client';
import { useState } from 'react';
import {
  GET_PRODUCT_DETAILS,
  GetProductDetailsVars,
  ProductDetailsDataType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';

interface Props {
  sku: string;
}

export type SelectedConfigurableProductOptions = { [key: string]: number };

export type HandleSelectedConfigurableOptions = (
  optionCode: string,
  valueIndex: number,
) => void;

interface Result {
  productDetails?: ProductDetailsType | null;
  loading: boolean;
  error: ApolloError | undefined;
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions;
  handleSelectedConfigurableOptions: HandleSelectedConfigurableOptions;
}

export const useProductDetails = ({ sku }: Props): Result => {
  const [
    selectedConfigurableProductOptions,
    setSelectedConfigurableProductOptions,
  ] = useState<SelectedConfigurableProductOptions>({});
  const { data, loading, error } = useQuery<
    ProductDetailsDataType,
    GetProductDetailsVars
  >(GET_PRODUCT_DETAILS, {
    variables: {
      sku,
    },
  });

  const handleSelectedConfigurableOptions: HandleSelectedConfigurableOptions = (
    optionCode,
    valueIndex,
  ) => {
    setSelectedConfigurableProductOptions(prevState => ({
      ...prevState,
      [optionCode]: valueIndex,
    }));
  };

  return {
    productDetails: data?.products?.items?.[0],
    loading,
    error,
    selectedConfigurableProductOptions,
    handleSelectedConfigurableOptions,
  };
};
