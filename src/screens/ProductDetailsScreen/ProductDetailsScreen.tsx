import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StackParamList,
  NAVIGATION_TO_PRODUCT_DETAILS_SCREEN,
} from '../../navigation';
import { useProductDetails } from '../../logic/products/useProductDetails';

type Props = {
  navigation: StackNavigationProp<
    StackParamList,
    NAVIGATION_TO_PRODUCT_DETAILS_SCREEN
  >;
  route: RouteProp<StackParamList, NAVIGATION_TO_PRODUCT_DETAILS_SCREEN>;
};

const ProductDetailsScreen = ({
  navigation,
  route: {
    params: { sku },
  },
}: Props): React.ReactElement => {
  const {
    getProductDetails,
    productDetails,
    loading,
    error,
  } = useProductDetails({
    sku,
  });

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View>
      <Text>{productDetails && JSON.stringify(productDetails, null, 2)}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
