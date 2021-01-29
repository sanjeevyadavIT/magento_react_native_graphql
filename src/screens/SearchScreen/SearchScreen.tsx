import React, { useContext, useMemo } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, SearchBar, ThemeContext } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { GenericTemplate, ProductListItem, Spinner } from '../../components';
import { useSearch } from '../../logic';
import { AppStackParamList, Routes } from '../../navigation';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { translate } from '../../i18n';
import { LIMITS, SPACING } from '../../constants';
import { NetworkStatus } from '@apollo/client';

type Props = {
  navigation: StackNavigationProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_SEARCH_SCREEN
  >;
};

const SearchScreen = ({ navigation }: Props): React.ReactElement => {
  const {
    searchText,
    handleChange,
    networkStatus,
    called,
    loadMore,
    data: { products: { items: products = [] } = {} } = {},
  } = useSearch();
  const { theme } = useContext(ThemeContext);
  const loadingProps = useMemo(() => ({ color: theme.colors?.primary }), [
    theme,
  ]);

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
      networkStatus !== NetworkStatus.loading && (
        <View style={styles.center}>
          <Text>
            {translate('searchScreen.noProductsFound', { searchText })}
          </Text>
        </View>
      )) || <></>;

  const renderFooterComponent = () =>
    (networkStatus === NetworkStatus.fetchMore && (
      <View style={styles.footerContainer}>
        <Spinner />
      </View>
    )) || <></>;

  return (
    <GenericTemplate>
      <SearchBar
        placeholder={translate('searchScreen.searchBarHint')}
        onChangeText={handleChange}
        value={searchText}
        showLoading={networkStatus === NetworkStatus.loading}
        searchIcon={{
          name: 'arrow-back',
          onPress: handleBackPress,
        }}
        loadingProps={loadingProps}
        containerStyle={styles.searchBarContainer}
      />
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => `productListItem${item.sku}`}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooterComponent}
        onEndReached={loadMore}
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
    borderTopWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  footerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.small,
  },
});

export default SearchScreen;
