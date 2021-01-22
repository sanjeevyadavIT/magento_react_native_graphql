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
import { Routes, AppStackParamList } from '../../navigation';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { SPACING } from '../../constants';
import { GenericTemplate, ProductListItem } from '../../components';

interface Props {
  navigation: StackNavigationProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_PRODUCT_LIST_SCREEN
  >;
  route: RouteProp<AppStackParamList, Routes.NAVIGATION_TO_PRODUCT_LIST_SCREEN>;
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
    navigation.navigate(Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN, {
      name: products[index].name,
      sku: products[index].sku,
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductInListType;
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
    <GenericTemplate errorMessage={error?.message}>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => `productListItem${item.sku}`}
        refreshControl={
          <RefreshControl
            refreshing={loading && currentPage === 1}
            onRefresh={refresh}
          />
        }
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.small,
  },
});

export default ProductListScreen;
