import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Image, ThemeContext } from 'react-native-elements';
import { ProductInListType } from '../../apollo/queries/productsFragment';
import { formatPrice } from '../../logic';
import { DIMENS } from '../../constants';

interface Props {
  item: ProductInListType;
  index: number;
  horizontalMode?: boolean;
  onPress(arg0: number): void;
  navigation?: {
    navigate: (arg0: string, arg1: object) => {};
  };
}

const COLUMN_WIDTH = DIMENS.common.WINDOW_WIDTH / 2;

const ProductListItem = ({
  item,
  index,
  horizontalMode = false,
  onPress,
}: Props): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  const renderImage = () => {
    const uri = `${item.smallImage.url}?width=${COLUMN_WIDTH}`;
    return <Image source={{ uri }} style={styles.image} />;
  };

  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <View
        style={[
          styles.container,
          {
            borderColor: theme.colors?.divider,
            backgroundColor: theme.colors?.white,
          },
          horizontalMode && styles.topBorder,
          (horizontalMode || index % 2 !== 0) && styles.leftBorder,
        ]}
      >
        {renderImage()}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {formatPrice(item.priceRange.maximumPrice.finalPrice)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: COLUMN_WIDTH,
    borderBottomWidth: DIMENS.common.borderWidth,
    overflow: 'hidden',
  },
  leftBorder: {
    borderLeftWidth: DIMENS.common.borderWidth,
  },
  topBorder: {
    borderTopWidth: DIMENS.common.borderWidth,
  },
  image: {
    width: COLUMN_WIDTH,
    height: (COLUMN_WIDTH / 3) * 4,
  },
  name: {
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductListItem;
