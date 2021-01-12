import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import { MediaGallery, GenericTemplate } from '../../components';
import { SPACING } from '../../constants';
import { AppStackParamList, Routes } from '../../navigation';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { getPriceStringFromPriceRange } from '../../logic';

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

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <GenericTemplate scrollable loading={loading} errorMessage={error?.message}>
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
});

export default ProductDetailsScreen;
