import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, ThemeContext, Button, Badge } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import { showMessage } from 'react-native-flash-message';
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
import ConfigurableProductOptions from './ConfigurableProductOptions';

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
  const {
    error,
    loading,
    priceRange,
    mediaGallery,
    productDetails,
    selectedConfigurableProductOptions,
    handleSelectedConfigurableOptions,
  } = useProductDetails({
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
      showMessage({
        message: translate('common.attention'),
        description: translate('productDetailsScreen.productTypeNotSupported'),
        type: 'warning',
      });
    }
  };

  const renderPrice = (): React.ReactNode => {
    if (productDetails && priceRange) {
      return (
        <Text h2 style={styles.price}>
          {formatPrice(priceRange.maximumPrice.finalPrice)}
        </Text>
      );
    }
    return null;
  };

  const renderOptions = (): React.ReactNode => {
    if (productDetails?.type === ProductTypeEnum.CONFIGURED) {
      return (
        <ConfigurableProductOptions
          options={productDetails?.configurableOptions}
          selectedConfigurableProductOptions={
            selectedConfigurableProductOptions
          }
          handleSelectedConfigurableOptions={handleSelectedConfigurableOptions}
        />
      );
    }
    return null;
  };

  const renderDiscription = (): React.ReactNode => {
    if (productDetails) {
      return (
        <HTML
          source={{ html: productDetails.description.html }}
          contentWidth={Dimensions.get('window').width}
          containerStyle={styles.description}
          baseFontStyle={{ color: theme.colors?.black }}
        />
      );
    }
    return null;
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
        <MediaGallery items={mediaGallery} />
        <Text h1 style={styles.name}>
          {productDetails?.name}
        </Text>
        {renderPrice()}
        {renderOptions()}
        {renderDiscription()}
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
