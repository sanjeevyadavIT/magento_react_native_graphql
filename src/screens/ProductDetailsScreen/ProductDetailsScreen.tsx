import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, ThemeContext, Button } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import Toast from 'react-native-simple-toast';
import { MediaGallery, GenericTemplate } from '../../components';
import { SPACING } from '../../constants';
import { AppStackParamList, Routes } from '../../navigation';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { getPriceStringFromPriceRange, showLoginPrompt } from '../../logic';
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
  const {
    error,
    loading,
    productDetails,
    getProductDetails,
  } = useProductDetails({
    sku,
  });
  const {
    isLoggedIn,
    addProductsToCart,
    loading: addProductsToCartLoading,
  } = useCart();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showLoginPrompt(
        translate('productDetailsScreen.guestUserPromptMessage'),
        navigation,
      );
      return;
    }

    if (productDetails?.type === ProductTypeEnum.SIMPLE) {
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
          loading={addProductsToCartLoading}
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
            {getPriceStringFromPriceRange(productDetails.price_range)}
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
});

export default ProductDetailsScreen;
