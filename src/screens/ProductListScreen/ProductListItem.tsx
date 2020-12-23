import React from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CategoryProductType } from '../../apollo/queries/getCategoryProducts';

interface Props {
  item: CategoryProductType;
  index: number;
  onPress(arg0: number): void;
  navigation?: {
    navigate: (arg0: string, arg1: object) => {};
  };
}

const COLUMN_WIDTH = Dimensions.get('window').width / 2;

// TODO: remove hard-coded color & dimension vaues
const ProductListItem = ({
  item,
  index,
  onPress,
}: Props): React.ReactElement => {
  const renderImage = () => {
    const uri = `${item.small_image.url}?width=${COLUMN_WIDTH}`;
    return <Image source={{ uri }} style={styles.image} />;
  };

  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <View style={[styles.container, index % 2 !== 0 && styles.leftBorder]}>
        {renderImage()}
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: COLUMN_WIDTH,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  leftBorder: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  image: {
    width: COLUMN_WIDTH,
    height: (COLUMN_WIDTH / 3) * 4,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProductListItem;
