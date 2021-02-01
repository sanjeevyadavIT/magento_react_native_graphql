import { useState } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
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
  productDetails?: ProductDetailsType | null;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useProductDetails = ({ sku }: Props): Result => {
  const [productDetails, setProductDetails] = useState<
    ProductDetailsType | null | undefined
  >(null);
  const { loading, error } = useQuery<
    ProductDetailsDataType,
    GetProductDetailsVars
  >(GET_PRODUCT_DETAILS, {
    variables: {
      sku,
    },
    fetchPolicy: 'no-cache',
    onCompleted: responseData => {
      console.log(responseData);
      setProductDetails(responseData?.products?.items?.[0]);
    },
  });

  return {
    productDetails,
    loading,
    error,
  };
};
