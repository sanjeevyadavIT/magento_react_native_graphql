import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GetSearchProductsVars,
  GET_SEARCH_PRODUCTS,
  SearchProductsDataType,
} from '../../apollo/queries/getSearchProducts';

const PAGE_SIZE = 10;
const AUTO_SUGGESTION_API_TIME_DELAY = 1000;

export const useSearch = () => {
  const [searchText, handleChange] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [getSearchProducts, { loading, error, data }] = useLazyQuery<
    SearchProductsDataType,
    GetSearchProductsVars
  >(GET_SEARCH_PRODUCTS);

  useEffect(() => {
    if (searchText.trim() === '' || searchText.trim().length < 3) {
      // can do something
      return;
    }
    const task = setTimeout(
      () =>
        getSearchProducts({
          variables: {
            searchText,
            pageSize: PAGE_SIZE,
            currentPage,
          },
        }),
      AUTO_SUGGESTION_API_TIME_DELAY,
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
    searchText,
    handleChange,
    getSearchProducts,
  };
};
