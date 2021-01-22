import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GetSearchProductsVars,
  GET_SEARCH_PRODUCTS,
  SearchProductsDataType,
} from '../../apollo/queries/getSearchProducts';
import { LIMITS } from '../../constants';

interface Result {
  data: SearchProductsDataType | undefined;
  loading: boolean;
  called: boolean;
  searchText: string;
  handleChange(arg1: string): void;
  getSearchProducts(): void;
}

export const useSearch = (): Result => {
  const [searchText, handleChange] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [getSearchProducts, { called, loading, error, data }] = useLazyQuery<
    SearchProductsDataType,
    GetSearchProductsVars
  >(GET_SEARCH_PRODUCTS);

  useEffect(() => {
    if (searchText.trim().length < LIMITS.searchTextMinLength) {
      // Don't do anything
      return;
    }
    const task = setTimeout(
      () =>
        getSearchProducts({
          variables: {
            searchText,
            pageSize: LIMITS.searchScreenPageSize,
            currentPage,
          },
        }),
      LIMITS.autoSearchApiTimeDelay,
    );

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(task);
    };
  }, [searchText]);

  console.log({ loading, error, data });
  return {
    data,
    loading,
    called,
    searchText,
    handleChange,
    getSearchProducts,
  };
};
