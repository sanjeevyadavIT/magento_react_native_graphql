import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCategoryProducts } from '../../logic';
import {
  NAVIGATION_TO_PRODUCT_LIST_SCREEN,
  StackParamList,
} from '../../navigation';

interface Props {
  navigation: StackNavigationProp<
    StackParamList,
    NAVIGATION_TO_PRODUCT_LIST_SCREEN
  >;
  route: RouteProp<StackParamList, NAVIGATION_TO_PRODUCT_LIST_SCREEN>;
}

const ProductListScreen = ({
  navigation,
  route: {
    params: { categoryId },
  },
}: Props): React.ReactElement => {
  const { getCategoryProducts, products, loading, error } = useCategoryProducts(
    {
      categoryId,
      pageSize: 10,
      currentPage: 1,
    },
  );

  useEffect(() => {
    getCategoryProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>{products && JSON.stringify(products, null, 2)}</Text>
    </View>
  );
};

export default ProductListScreen;
