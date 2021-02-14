import { useQuery, ApolloError } from '@apollo/client';
import {
  GET_CATEGORIES,
  CategoryType,
  GetCategoriesVars,
  CategoriesDataType,
} from '../../apollo/queries/getCategories';

interface Props {
  categoryId: string;
}

interface Result {
  categories?: Array<CategoryType>;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useCategories = ({ categoryId: id }: Props): Result => {
  const { loading, data, error } = useQuery<
    CategoriesDataType,
    GetCategoriesVars
  >(GET_CATEGORIES, {
    variables: {
      id,
    },
  });

  return {
    categories: data?.categoryList?.[0]?.children,
    loading,
    error,
  };
};
