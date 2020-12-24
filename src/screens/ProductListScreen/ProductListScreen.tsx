import React, { useEffect } from 'react';
import {
  View,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCategoryProducts } from '../../logic';
import {
  NAVIGATION_TO_PRODUCT_LIST_SCREEN,
  NAVIGATION_TO_PRODUCT_DETAILS_SCREEN,
  StackParamList,
} from '../../navigation';
import ProductListItem from './ProductListItem';
import { CategoryProductType } from '../../apollo/queries/getCategoryProducts';
import { SPACING } from '../../constants';

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
  const {
    getCategoryProducts,
    products,
    loading,
    currentPage,
    error,
    refresh,
    loadMore,
  } = useCategoryProducts({
    categoryId,
  });

  useEffect(() => {
    getCategoryProducts();
  }, []);

  const onProductItemClicked = (index: number) => {
    navigation.navigate(NAVIGATION_TO_PRODUCT_DETAILS_SCREEN, {
      name: products[index].name,
      sku: products[index].sku,
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: CategoryProductType;
    index: number;
  }) => {
    return (
      <ProductListItem
        item={item}
        index={index}
        onPress={onProductItemClicked}
      />
    );
  };

  const renderFooter = () => {
    if (loading && products.length !== 0) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlist}
        keyExtractor={item => `productListItem${item.id.toString()}`}
        refreshControl={
          <RefreshControl
            refreshing={loading && currentPage === 1}
            onRefresh={refresh}
          />
        }
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {},
  footerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.small,
  },
});

export default ProductListScreen;
