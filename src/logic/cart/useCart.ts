import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  CreateCartDataType,
  CREATE_CART,
} from '../../apollo/mutations/createCart';

interface Result {
  cartId: string | null | undefined;
}

export const useCart = (): Result => {
  const [cartId, setCartId] = useState<string | null | undefined>(null);
  const [fetchCartId] = useMutation<CreateCartDataType>(CREATE_CART);

  useEffect(() => {
    if (!cartId) {
      createCart();
    }
  }, []);

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
