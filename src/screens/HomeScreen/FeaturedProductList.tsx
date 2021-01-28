import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { ProductListItem } from '../../components';
import { DIMENS, SPACING } from '../../constants';
import { useCategoryProducts } from '../../logic';
import { Routes } from '../../navigation';
import { NetworkStatus } from '@apollo/client';

type Props = {
  name?: string;
  categoryId: string;
};

const FeaturedProductList = ({
  name,
  categoryId,
}: Props): React.ReactElement => {
  const { data, networkStatus, error } = useCategoryProducts({ categoryId });
  const navigation = useNavigation();

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
        horizontalMode
        onPress={onProductItemClicked}
      />
    );
  };

  if (error?.message) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  // TODO: Remove hard-coded values
  if (networkStatus === NetworkStatus.loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {name && (
        <Text h4 h4Style={styles.title}>
          {name}
        </Text>
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.products?.items ?? []}
        renderItem={renderItem}
        keyExtractor={item => `productListItem${item.sku}`}
      />
    </View>
  );
};

// TODO: Extract hard coded values
const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
    backgroundColor: '#fff',
  },
  title: {
    marginStart: SPACING.large,
    paddingVertical: SPACING.small,
    fontSize: 16,
  },
  loadingBox: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: SPACING.large,
    height: (DIMENS.common.WINDOW_WIDTH / 3) * 2, // This is linked to ProductListItem height
  },
});

export default FeaturedProductList;
