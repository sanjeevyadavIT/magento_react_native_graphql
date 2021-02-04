import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { ProductListItem, Spinner } from '../../components';
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
  const { theme } = useContext(ThemeContext);
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

  if (networkStatus === NetworkStatus.loading) {
    return (
      <View style={styles.loadingBox(theme)}>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.container(theme)}>
      {name && (
        <Text h2 h2Style={styles.title}>
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

const styles = StyleSheet.create({
  container: theme => ({
    marginBottom: SPACING.large,
    backgroundColor: theme.colors?.white,
  }),
  title: {
    marginStart: SPACING.large,
    paddingVertical: SPACING.small,
  },
  loadingBox: theme => ({
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: theme.colors?.white,
    marginBottom: SPACING.large,
    height: (DIMENS.common.WINDOW_WIDTH / 3) * 2, // This is linked to ProductListItem height
  }),
});

export default FeaturedProductList;
