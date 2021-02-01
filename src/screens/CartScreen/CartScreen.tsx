import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorParamList, Routes } from '../../navigation';
import { useCart } from '../../logic/cart/useCart';
import { GenericTemplate } from '../../components';
import { translate } from '../../i18n';
import CartListItem from './CartListItem';
import { SPACING } from '../../constants';
import { CartFooter } from './CartFooter';

type Props = {
  navigation: BottomTabNavigationProp<
    BottomTabNavigatorParamList,
    Routes.NAVIGATION_TO_PROFILE_SCREEN
  >;
};

const CartScreen = ({ navigation }: Props): React.ReactElement => {
  const { cartData, cartLoading, cartError } = useCart();
  const handleOnPress = (index: number) => console.log(index);
  const handleRemoveItem = (index: number) => console.log(index);
  const handlePlaceOrder = () => console.log('handle place order');

  const renderEmptyList = () =>
    (!cartLoading && (
      <View style={styles.emptyContainer}>
        <Text h4Style={styles.centerText} h4>
          {translate('cartScreen.cartEmptyTitle')}
        </Text>
        <Text style={styles.centerText}>
          {translate('cartScreen.cartEmptyMessage')}
        </Text>
      </View>
    )) || <></>;

  return (
    <GenericTemplate
      loading={cartLoading}
      errorMessage={cartError?.message}
      footer={
        (cartData?.customerCart?.items?.length ?? 0) > 0 && (
          <CartFooter
            grandTotal={cartData?.customerCart?.prices.grandTotal}
            handlePlaceOrder={handlePlaceOrder}
          />
        )
      }
    >
      <FlatList
        data={cartData?.customerCart?.items ?? []}
        renderItem={({ item, index }) => (
          <CartListItem
            item={item}
            index={index}
            onPress={handleOnPress}
            onRemovePress={handleRemoveItem}
          />
        )}
        contentContainerStyle={
          cartData?.customerCart?.items.length === 0 && styles.fullScreen
        }
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={renderEmptyList}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.small,
  },
  centerText: {
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
});

export default CartScreen;
