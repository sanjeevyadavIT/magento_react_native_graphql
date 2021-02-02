import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, ThemeContext, Button, Badge } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import Toast from 'react-native-simple-toast';
import {
  MediaGallery,
  GenericTemplate,
  CustomHeaderButtons,
  CustomHeaderItem,
} from '../../components';
import { DIMENS, SPACING } from '../../constants';
import { AppStackParamList, Routes } from '../../navigation';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { formatPrice, showLoginPrompt } from '../../logic';
import { translate } from '../../i18n';
import { useCart } from '../../logic/cart/useCart';
import { ProductTypeEnum } from '../../apollo/queries/getProductDetails';

type Props = {
  navigation: StackNavigationProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN
  >;
  route: RouteProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN
  >;
};

const ProductDetailsScreen = ({
  navigation,
  route: {
    params: { sku },
  },
}: Props): React.ReactElement => {
  const { error, loading, productDetails } = useProductDetails({
    sku,
  });
  const {
    cartCount,
    isLoggedIn,
    addProductsToCart,
    addToCartLoading,
  } = useCart();
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButtons>
          <CustomHeaderItem
            title={translate('common.cart')}
            iconName="shopping-cart"
            onPress={() =>
              navigation.navigate(Routes.NAVIGATION_TO_CART_SCREEN)
            }
          />
          {cartCount !== '' && (
            <Badge
              value={cartCount}
              status="error"
              textStyle={styles.badgeText}
              containerStyle={styles.badge}
            />
          )}
        </CustomHeaderButtons>
      ),
    });
  }, [navigation, cartCount]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showLoginPrompt(
        translate('productDetailsScreen.guestUserPromptMessage'),
        navigation,
      );
      return;
    }

    if (
      productDetails?.type === ProductTypeEnum.SIMPLE ||
      productDetails?.type === ProductTypeEnum.GROUPED
    ) {
      addProductsToCart({
        quantity: 1,
        sku: productDetails.sku,
      });
    } else {
      Toast.show(
        translate('productDetailsScreen.productTypeNotSupported', Toast.LONG),
      );
    }
  };

  return (
    <GenericTemplate
      scrollable
      loading={loading}
      errorMessage={error?.message}
      footer={
        <Button
          loading={addToCartLoading}
          containerStyle={styles.noBorderRadius}
          buttonStyle={styles.noBorderRadius}
          title={translate('productDetailsScreen.addToCart')}
          onPress={handleAddToCart}
        />
      }
    >
      <View>
        <MediaGallery items={productDetails?.media_gallery ?? []} />
        <Text h4 style={styles.name}>
          {productDetails?.name}
        </Text>
        {!!productDetails && (
          <Text style={styles.price}>
            {formatPrice(productDetails.price_range.maximum_price.final_price)}
          </Text>
        )}
        {!!productDetails && (
          <HTML
            source={{ html: productDetails.description.html }}
            contentWidth={Dimensions.get('window').width}
            containerStyle={styles.description}
            baseFontStyle={{ color: theme.colors?.black }}
          />
        )}
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    marginTop: SPACING.large,
  },
  price: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    paddingHorizontal: SPACING.large,
  },
  noBorderRadius: {
    borderRadius: 0,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: 0,
  },
  badgeText: {
    fontSize: DIMENS.common.cartItemCountFontSize,
    textAlign: 'center',
  },
});

export default ProductDetailsScreen;
