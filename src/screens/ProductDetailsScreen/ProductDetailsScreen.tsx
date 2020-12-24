import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import { MediaGallery } from '../../components';
import { SPACING } from '../../constants';
import {
  StackParamList,
  NAVIGATION_TO_PRODUCT_DETAILS_SCREEN,
} from '../../navigation';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { getPriceStringFromPriceRange } from '../../logic';

type Props = {
  navigation: StackNavigationProp<
    StackParamList,
    NAVIGATION_TO_PRODUCT_DETAILS_SCREEN
  >;
  route: RouteProp<StackParamList, NAVIGATION_TO_PRODUCT_DETAILS_SCREEN>;
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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <ScrollView>
      <View>
        <MediaGallery items={productDetails?.media_gallery ?? []} />
        <Text style={styles.name}>{productDetails?.name}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    fontSize: 16,
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
