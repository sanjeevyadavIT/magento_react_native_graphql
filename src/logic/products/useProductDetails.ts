import { useEffect, useState } from 'react';
import { useLazyQuery, ApolloError } from '@apollo/client';

interface Props {
  categoryId: string;
}

interface Result {
  getProductDetails(): void;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useProductDetails = ({}: Props): Result => {
  return {
    getProductDetails: () => {},
    loading: false,
    error: undefined,
  };
};
