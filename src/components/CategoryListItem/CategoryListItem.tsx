import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SPACING } from '../../constants';
import { CategoryType } from '../../apollo/queries/getCategories';
import { NAVIGATION_TO_CATGEORIES_SCREEN } from '../../navigation';

interface Props {
  item: CategoryType;
  navigation: {
    navigate: (arg0: string, arg1: object) => {};
  };
}

const CategoryListItem = ({ item, navigation }: Props): React.ReactElement => {
  const onCatgeoryPress = () => {
    if (+item.children_count > 0) {
      navigation.navigate(NAVIGATION_TO_CATGEORIES_SCREEN, {
        categoryId: item.id,
        name: item.name,
      });
      return;
    }
    navigation.navigate('productlist ', {
      categoryId: item.id,
    });
  };

  return (
    <TouchableOpacity onPress={onCatgeoryPress}>
      <View style={styles.categoryContainer}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: SPACING.large,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default CategoryListItem;
