import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, SearchBar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { GenericTemplate, ProductListItem } from '../../components';
import { useSearch } from '../../logic';
import { AppStackParamList, Routes } from '../../navigation';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { translate } from '../../i18n';
import { LIMITS, SPACING } from '../../constants';

type Props = {
  navigation: StackNavigationProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_SEARCH_SCREEN
  >;
};

// TODO: Implement pagination
const SearchScreen = ({ navigation }: Props): React.ReactElement => {
  const {
    searchText,
    handleChange,
    loading,
    called,
    data: { products: { items: products = [] } = {} } = {},
  } = useSearch();

  const handleBackPress = () => navigation.pop();

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

  // FIXME: Don't show when previous search result was empty, and user is typing
  // create a separate state
  const renderEmptyComponent = () =>
    (searchText.length >= LIMITS.searchTextMinLength &&
      products.length === 0 &&
      called &&
      !loading && (
        <View style={styles.center}>
          <Text>
            {translate('searchScreen.noProductsFound', { searchText })}
          </Text>
        </View>
      )) || <></>;

  return (
    <GenericTemplate>
      <SearchBar
        placeholder={translate('searchScreen.searchBarHint')}
        onChangeText={handleChange}
        value={searchText}
        showLoading={loading}
        searchIcon={{
          name: 'arrow-back',
          onPress: handleBackPress,
        }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => `productListItem${item.sku}`}
        ListEmptyComponent={renderEmptyComponent}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large,
  },
  searchBarContainer: {
    padding: 0,
  },
  searchBarInputContainer: {
    borderRadius: 0,
    backgroundColor: 'white',
  },
});

export default SearchScreen;
