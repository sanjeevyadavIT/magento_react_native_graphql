import { useEffect, useState } from 'react';
import { useLazyQuery, ApolloError } from '@apollo/client';
import {
  GET_CATGEORY_PRODUCTS,
  GetCategoryProductsVars,
  CategoryProductsDataType,
} from '../../apollo/queries/getCategoryProducts';
import { ProductInListType } from '../../apollo/queries/productsFragment';

interface Props {
  categoryId: string;
}

interface Result {
  products: Array<ProductInListType>;
  getCategoryProducts(): void;
  loading: boolean;
  error: ApolloError | undefined;
  currentPage: number;
  refresh(): void;
  loadMore(): void;
}

const PAGE_SIZE = 10;

export const useCategoryProducts = ({ categoryId: id }: Props): Result => {
  const [products, setProducts] = useState<Array<ProductInListType>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [getCategoryProducts, { loading, error }] = useLazyQuery<
    CategoryProductsDataType,
    GetCategoryProductsVars
  >(GET_CATGEORY_PRODUCTS, {
    variables: {
      id,
      pageSize: PAGE_SIZE,
      currentPage,
    },
    fetchPolicy: 'no-cache',
    onCompleted: responseData => {
      if (responseData?.products?.items && currentPage === 1) {
        setProducts(responseData.products.items);
      } else if (
        responseData?.products?.items &&
        products.length < responseData.products.total_count &&
        products.length < currentPage * PAGE_SIZE
      ) {
        setProducts(prevState => [
          ...prevState,
          ...responseData?.products?.items,
        ]);
      }
    },
  });

  useEffect(() => {
    if (!loading) {
      getCategoryProducts();
    }
  }, [currentPage, getCategoryProducts]);

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (currentPage * PAGE_SIZE === products.length) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const refresh = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getCategoryProducts();
    }
  };

  return {
    products,
    loading,
    error,
    getCategoryProducts,
    currentPage,
    refresh,
    loadMore,
  };
};
