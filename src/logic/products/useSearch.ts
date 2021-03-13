import { useState, useEffect } from 'react';
import { ApolloError, NetworkStatus, useLazyQuery } from '@apollo/client';
import {
  GetSearchProductsVars,
  GET_SEARCH_PRODUCTS,
  SearchProductsDataType,
} from '../../apollo/queries/getSearchProducts';
import { LIMITS } from '../../constants';

interface Result {
  data: SearchProductsDataType | undefined;
  networkStatus: NetworkStatus;
  called: boolean;
  error?: ApolloError;
  searchText: string;
  handleChange(arg1: string): void;
  getSearchProducts(): void;
  loadMore(): void;
}

export const useSearch = (): Result => {
  const [searchText, handleChange] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [
    getSearchProducts,
    { called, loading, error, networkStatus, fetchMore, data },
  ] = useLazyQuery<SearchProductsDataType, GetSearchProductsVars>(
    GET_SEARCH_PRODUCTS,
    {
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (searchText.trim().length < LIMITS.searchTextMinLength) {
      // Don't do anything
      return;
    }
    const task = setTimeout(() => {
      getSearchProducts({
        variables: {
          searchText,
          pageSize: LIMITS.searchScreenPageSize,
          currentPage: 1,
        },
      });
      setCurrentPage(1);
    }, LIMITS.autoSearchApiTimeDelay);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(task);
    };
  }, [searchText]);

  useEffect(() => {
    if (currentPage === 1) return;
    fetchMore?.({
      variables: {
        currentPage,
      },
    });
  }, [currentPage]);

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (
      currentPage * LIMITS.searchScreenPageSize ===
        data?.products?.items?.length &&
      data?.products?.items.length < data?.products?.totalCount
    ) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return {
    data,
    networkStatus,
    called,
    error,
    searchText,
    loadMore,
    handleChange,
    getSearchProducts,
  };
};
