import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, ThemeContext, Button } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import { useQuery } from '@apollo/client';
import { MediaGallery, GenericTemplate } from '../../components';
import { SPACING } from '../../constants';
import { AppStackParamList, Routes } from '../../navigation';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { getPriceStringFromPriceRange, showLoginPrompt } from '../../logic';
import { translate } from '../../i18n';
import {
  IsLoggedInDataType,
  IS_LOGGED_IN,
} from '../../apollo/queries/isLoggedIn';

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
    getProductDetails,
    productDetails,
    loading,
    error,
  } = useProductDetails({
    sku,
  });
  const { data } = useQuery<IsLoggedInDataType>(IS_LOGGED_IN);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleAddToCart = () => {
    if (!data?.isLoggedIn) {
      showLoginPrompt(
        translate('productDetailsScreen.guestUserPromptMessage'),
        navigation,
      );
      return;
    }
  };

  return (
    <GenericTemplate
      scrollable
      loading={loading}
      errorMessage={error?.message}
      footer={
        <Button
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
