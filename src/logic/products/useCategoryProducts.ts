import { useEffect, useState } from 'react';
import { useLazyQuery, ApolloError } from '@apollo/client';
import {
  GET_CATGEORY_PRODUCTS,
  CatgeoryProductType,
  CategoryProductsDataType,
} from '../../apollo/queries/getCategoryProducts';

interface Props {
  categoryId: string;
  pageSize: number;
  currentPage: number;
}

interface Result {
  products: Array<CatgeoryProductType>;
  getCategoryProducts(): void;
  loading: boolean;
  error: ApolloError | undefined;
}

interface CategoryProductsVars {
  id: string;
  pageSize: number;
  currentPage: number;
}

export const useCategoryProducts = ({
  categoryId: id,
  pageSize,
  currentPage,
}: Props): Result => {
  const [products, setProducts] = useState<Array<CatgeoryProductType>>([]);
  const [getCategoryProducts, { called, data, loading, error }] = useLazyQuery<
    CategoryProductsDataType,
    CategoryProductsVars
  >(GET_CATGEORY_PRODUCTS, {
    variables: {
      id,
      pageSize,
      currentPage,
    },
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products.items);
    }
  }, [data]);

  return {
    products,
    loading,
    error,
    getCategoryProducts,
  };
};
