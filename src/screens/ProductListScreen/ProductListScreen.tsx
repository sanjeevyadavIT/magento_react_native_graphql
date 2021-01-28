import React from 'react';
import { View, RefreshControl, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCategoryProducts } from '../../logic';
import { Routes, AppStackParamList } from '../../navigation';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { SPACING } from '../../constants';
import { GenericTemplate, ProductListItem, Spinner } from '../../components';
import { NetworkStatus } from '@apollo/client';

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
  const { data, networkStatus, error, refresh, loadMore } = useCategoryProducts(
    {
      categoryId,
    },
  );

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
    (networkStatus === NetworkStatus.fetchMore && (
      <View style={styles.footerContainer}>
        <Spinner />
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
            refreshing={
              networkStatus === NetworkStatus.refetch ||
              networkStatus === NetworkStatus.loading
            }
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
