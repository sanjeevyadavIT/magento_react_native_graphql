import React from 'react';
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
    data,
    loading,
    currentPage,
    error,
    refresh,
    loadMore,
  } = useCategoryProducts({
    categoryId,
  });

  const onProductItemClicked = (index: number) => {
    if (data?.products?.items) {
      navigation.navigate(Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN, {
        name: data.products.items[index].name,
        sku: data.products.items[index].sku,
      });
    }
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

  const renderFooterComponent = () =>
    (loading && data?.products?.items?.length !== 0 && (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" />
      </View>
    )) || <></>;

  return (
    <GenericTemplate errorMessage={error?.message}>
      <FlatList
        numColumns={2}
        data={data?.products?.items ?? []}
        renderItem={renderItem}
        keyExtractor={item => `productListItem${item.sku}`}
        refreshControl={
          <RefreshControl
            refreshing={loading && currentPage === 1}
            onRefresh={refresh}
          />
        }
        onEndReached={loadMore}
        ListFooterComponent={renderFooterComponent}
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
