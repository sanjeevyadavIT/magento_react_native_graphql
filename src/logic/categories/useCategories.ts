import { useEffect, useState } from 'react';
import { useLazyQuery, ApolloError } from '@apollo/client';
import {
  GET_CATEGORIES,
  CategoryType,
  CategoriesDataType,
} from '../../apollo/queries/getCategories';

interface Props {
  categoryId: string;
}

interface Result {
  categories: Array<CategoryType>;
  loading: boolean;
  error: ApolloError | undefined;
}

interface CategoriesVars {
  id: string;
}

export const useCategories = ({ categoryId: id }: Props): Result => {
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [getCategories, { called, loading, data, error }] = useLazyQuery<
    CategoriesDataType,
    CategoriesVars
  >(GET_CATEGORIES, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (!called) {
      getCategories();
    }
  }, [called]);

  useEffect(() => {
    if (data) {
      if (data.categoryList?.[0]?.children?.length > 0) {
        setCategories(data.categoryList[0].children);
      }
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  return {
    categories,
    loading,
    error,
  };
};
