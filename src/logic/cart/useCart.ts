import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateCartDataType,
  CREATE_CART,
} from '../../apollo/mutations/createCart';
import {
  IsLoggedInDataType,
  IS_LOGGED_IN,
} from '../../apollo/queries/isLoggedIn';

interface Result {
  cartId: string | null | undefined;
}

export const useCart = (): Result => {
  const [cartId, setCartId] = useState<string | null | undefined>(null);
  const { data: { isLoggedIn = false } = {} } = useQuery<IsLoggedInDataType>(
    IS_LOGGED_IN,
  );
  const [fetchCartId] = useMutation<CreateCartDataType>(CREATE_CART);

  useEffect(() => {
    if (isLoggedIn && !cartId) {
      createCart();
    }
  }, [isLoggedIn]);

  const createCart = async () => {
    try {
      const { data, errors } = await fetchCartId();
      setCartId(data?.cartId);
      console.log({ data, errors });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    cartId,
  };
};
