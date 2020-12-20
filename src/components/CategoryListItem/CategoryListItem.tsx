import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SPACING } from '../../constants';
import { CategoryType } from '../../apollo/queries/getCategories';
import {
  NAVIGATION_TO_CATEGORIES_SCREEN,
  NAVIGATION_TO_PRODUCT_LIST_SCREEN,
} from '../../navigation';

interface Props {
  item: CategoryType;
  navigation: {
    navigate: (arg0: string, arg1: object) => {};
  };
}

// TODO: Extract hard-coded color & dimension values
const CategoryListItem = ({ item, navigation }: Props): React.ReactElement => {
  const [disabled] = useState<boolean>(
    +item.children_count < 1 && item.product_count < 1,
  );
  const onCategoryPress = () => {
    if (+item.children_count > 0) {
      navigation.navigate(NAVIGATION_TO_CATEGORIES_SCREEN, {
        categoryId: item.id,
        name: item.name,
      });
      return;
    }
    navigation.navigate(NAVIGATION_TO_PRODUCT_LIST_SCREEN, {
      categoryId: item.id,
      name: item.name,
    });
  };

  const renderImage = () => {
    const rawUri =
      item.image ?? item.productPreviewImage?.items?.[0]?.small_image?.url;
    if (!rawUri) {
      return null;
    }
    const uri = `${rawUri ?? ''}?width=100`;

    return <Image source={{ uri }} resizeMode="cover" style={styles.image} />;
  };

  const renderContent = () => {
    return (
      <>
        {renderImage()}
        <Text style={styles.title}>{item.name}</Text>
      </>
    );
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={onCategoryPress}>
      <View style={styles.categoryContainer}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    marginStart: SPACING.large,
    marginTop: SPACING.large,
  },
});

export default CategoryListItem;
