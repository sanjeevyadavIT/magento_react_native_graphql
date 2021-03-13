import { useEffect, useState } from 'react';
import { useQuery, ApolloError, NetworkStatus } from '@apollo/client';
import {
  GET_CATGEORY_PRODUCTS,
  GetCategoryProductsVars,
  CategoryProductsDataType,
  SortEnum,
} from '../../apollo/queries/getCategoryProducts';
import { LIMITS } from '../../constants';

interface Props {
  categoryId: string;
}

interface Result {
  data: CategoryProductsDataType | undefined;
  networkStatus: NetworkStatus;
  error: ApolloError | undefined;
  refresh: (arg0?: { name?: SortEnum; price?: SortEnum }) => void;
  loadMore(): void;
}

export const useCategoryProducts = ({ categoryId: id }: Props): Result => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
    CategoryProductsDataType,
    GetCategoryProductsVars
  >(GET_CATGEORY_PRODUCTS, {
    variables: {
      id,
      pageSize: LIMITS.categoryProductsPageSize,
      currentPage: 1,
    },
    notifyOnNetworkStatusChange: true,
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
      data?.products?.items.length < data?.products?.totalCount
    ) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const refresh = ({
    price,
    name,
  }: { price?: SortEnum; name?: SortEnum } = {}) => {
    refetch({
      price,
      name,
    });
    setCurrentPage(1);
  };

  return {
    data,
    networkStatus,
    error,
    refresh,
    loadMore,
  };
};
