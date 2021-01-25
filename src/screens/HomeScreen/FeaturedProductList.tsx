import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { ProductListItem } from '../../components';
import { SPACING } from '../../constants';
import { useCategoryProducts } from '../../logic';
import { Routes } from '../../navigation';

type Props = {
  name?: string;
  categoryId: string;
};

const FeaturedProductList = ({
  name,
  categoryId,
}: Props): React.ReactElement => {
  const {
    getCategoryProducts,
    loading,
    products,
    error,
  } = useCategoryProducts({ categoryId });
  const navigation = useNavigation();

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

  if (loading) {
    return <ActivityIndicator size="large" />;
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
        data={products}
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
});

export default FeaturedProductList;
