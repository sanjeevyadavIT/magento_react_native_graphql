import { useState } from 'react';
import { useLazyQuery, ApolloError } from '@apollo/client';
import {
  GET_PRODUCT_DETAILS,
  GetProductDetailsVars,
  ProductDetailsDataType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';

interface Props {
  sku: string;
}

interface Result {
  getProductDetails(): void;
  productDetails?: ProductDetailsType | null;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useProductDetails = ({ sku }: Props): Result => {
  const [productDetails, setProductDetails] = useState<
    ProductDetailsType | null | undefined
  >(null);
  const [getProductDetails, { loading, error }] = useLazyQuery<
    ProductDetailsDataType,
    GetProductDetailsVars
  >(GET_PRODUCT_DETAILS, {
    variables: {
      sku,
    },
    onCompleted: responseData => {
      console.log(responseData);
      setProductDetails(responseData?.products?.items?.[0]);
    },
  });

  return {
    getProductDetails,
    productDetails,
    loading,
    error,
  };
};
