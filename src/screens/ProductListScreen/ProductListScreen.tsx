import React, { useContext, useLayoutEffect } from 'react';
import { View, RefreshControl, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NetworkStatus } from '@apollo/client';
import { BottomSheet, ListItem, ThemeContext } from 'react-native-elements';
import { useCategoryProducts, useSort } from '../../logic';
import { Routes, AppStackParamList } from '../../navigation';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { SPACING } from '../../constants';
import {
  GenericTemplate,
  ProductListItem,
  Spinner,
  CustomHeaderButtons,
  CustomHeaderItem,
} from '../../components';
import { translate } from '../../i18n';

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
  const { isVisible, selectedIndex, setVisible, sortOptions } = useSort({
    onPress: refresh,
  });
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButtons>
          <CustomHeaderItem
            title={translate('common.sort')}
            iconName="sort"
            onPress={() => setVisible(true)}
          />
        </CustomHeaderButtons>
      ),
    });
  }, [navigation]);

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
      <BottomSheet isVisible={isVisible} containerStyle={styles.sortContainer}>
        {sortOptions.map((option, index) => (
          <ListItem
            key={option.title}
            containerStyle={[
              option.containerStyle,
              selectedIndex === index && {
                backgroundColor: theme.colors?.grey5,
              },
            ]}
            onPress={option.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={option.titleStyle}>
                {option.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.small,
  },
  sortContainer: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
  },
});

export default ProductListScreen;
