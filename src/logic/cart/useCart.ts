import { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  IsLoggedInDataType,
  IS_LOGGED_IN,
} from '../../apollo/queries/isLoggedIn';
import { GetCartDataType, GET_CART } from '../../apollo/queries/getCart';

interface Result {
  data: GetCartDataType | undefined;
}

export const useCart = (): Result => {
  const { data: { isLoggedIn = false } = {} } = useQuery<IsLoggedInDataType>(
    IS_LOGGED_IN,
  );
  const [fetchCart, { data }] = useLazyQuery<GetCartDataType>(GET_CART);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  return {
    data,
  };
};
