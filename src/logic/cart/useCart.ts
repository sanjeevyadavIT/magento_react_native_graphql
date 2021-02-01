import { useEffect } from 'react';
import {
  ApolloError,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import Toast from 'react-native-simple-toast';
import {
  IsLoggedInDataType,
  IS_LOGGED_IN,
} from '../../apollo/queries/isLoggedIn';
import { GetCartDataType, GET_CART } from '../../apollo/queries/getCart';
import {
  AddProductsToCartDataType,
  AddProductsToCartVars,
  ADD_PRODUCTS_TO_CART,
  CartItemInputType,
} from '../../apollo/mutations/addProductsToCart';
import { translate } from '../../i18n';
import { getCartCount } from '../utils/cartHelpers';

interface Result {
  cartCount: string;
  cartData: GetCartDataType | undefined;
  cartLoading: boolean;
  cartError: ApolloError | undefined;
  addToCartLoading: boolean;
  isLoggedIn: boolean;
  addProductsToCart(arg0: CartItemInputType): void;
}

export const useCart = (): Result => {
  const { data: { isLoggedIn = false } = {} } = useQuery<IsLoggedInDataType>(
    IS_LOGGED_IN,
  );
  const [
    fetchCart,
    { data: cartData, loading: cartLoading, error: cartError },
  ] = useLazyQuery<GetCartDataType>(GET_CART);
  const [_addProductsToCart, { loading: addToCartLoading, data }] = useMutation<
    AddProductsToCartDataType,
    AddProductsToCartVars
  >(ADD_PRODUCTS_TO_CART, {
    onCompleted() {
      Toast.show(
        translate('productDetailsScreen.addToCartSuccessful', Toast.LONG),
      );
    },
    onError(_error) {
      Toast.show(
        translate(
          _error.message || 'productDetailsScreen.addToCartError',
          Toast.LONG,
        ),
      );
    },
  });
  const cartCount: string = getCartCount(cartData?.customerCart?.items?.length);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const addProductsToCart = (productToAdd: CartItemInputType) => {
    if (isLoggedIn && cartData?.customerCart.id) {
      _addProductsToCart({
        variables: {
          cartId: cartData.customerCart.id,
          cartItems: [productToAdd],
        },
      });
    }
  };

  return {
    addProductsToCart,
    isLoggedIn,
    cartCount,
    cartData,
    cartLoading,
    cartError,
    addToCartLoading,
  };
};
