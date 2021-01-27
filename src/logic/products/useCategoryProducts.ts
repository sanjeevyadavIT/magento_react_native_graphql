import { useEffect, useState } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import {
  GET_CATGEORY_PRODUCTS,
  GetCategoryProductsVars,
  CategoryProductsDataType,
} from '../../apollo/queries/getCategoryProducts';
import { LIMITS } from '../../constants';

interface Props {
  categoryId: string;
}

interface Result {
  data: CategoryProductsDataType | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  currentPage: number;
  refresh(): void;
  loadMore(): void;
}

export const useCategoryProducts = ({ categoryId: id }: Props): Result => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { refetch, data, loading, error, fetchMore } = useQuery<
    CategoryProductsDataType,
    GetCategoryProductsVars
  >(GET_CATGEORY_PRODUCTS, {
    variables: {
      id,
      pageSize: LIMITS.categoryProductsPageSize,
      currentPage: 1,
    },
  });

  useEffect(() => {
    if (!loading && currentPage !== 1) {
      fetchMore({
        variables: {
          currentPage,
        },
      });
    }
  }, [currentPage]);

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (
      currentPage * LIMITS.categoryProductsPageSize ===
        data?.products?.items?.length &&
      data?.products?.items.length < data?.products?.total_count
    ) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const refresh = () => {
    refetch();
    setCurrentPage(1);
  };

  return {
    data,
    loading,
    error,
    currentPage,
    refresh,
    loadMore,
  };
};
