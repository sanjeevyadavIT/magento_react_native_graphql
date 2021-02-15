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
  const { data, loading, error } = useQuery<
    ProductDetailsDataType,
    GetProductDetailsVars
  >(GET_PRODUCT_DETAILS, {
    variables: {
      sku,
    },
  });

  return {
    productDetails: data?.products?.items?.[0],
    loading,
    error,
  };
};
