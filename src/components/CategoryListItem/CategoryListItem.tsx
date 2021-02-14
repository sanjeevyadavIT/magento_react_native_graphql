import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Image } from 'react-native-elements';
import { DIMENS } from '../../constants';
import { CategoryType } from '../../apollo/queries/getCategories';
import { Routes } from '../../navigation';

interface Props {
  item: CategoryType;
  navigation: {
    navigate: (arg0: string, arg1: object) => {};
  };
}

const CategoryListItem = ({ item, navigation }: Props): React.ReactElement => {
  const [disabled] = useState<boolean>(
    +item.childrenCount < 1 && item.productCount < 1,
  );
  const onCategoryPress = () => {
    if (+item.childrenCount > 0) {
      navigation.navigate(Routes.NAVIGATION_TO_CATEGORIES_SCREEN, {
        categoryId: item.id,
        name: item.name,
      });
      return;
    }
    navigation.navigate(Routes.NAVIGATION_TO_PRODUCT_LIST_SCREEN, {
      categoryId: item.id,
      name: item.name,
    });
  };

  const renderImage = () => {
    const rawUri =
      item.image ?? item.productPreviewImage?.items?.[0]?.smallImage?.url;
    if (!rawUri) {
      return null;
    }
    const uri = `${rawUri ?? ''}?width=100`;

    return <Image source={{ uri }} resizeMode="cover" style={styles.image} />;
  };

  const renderContent = () => {
    return (
      <>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </>
    );
  };

  return (
    <ListItem
      containerStyle={styles.conatiner}
      disabled={disabled}
      onPress={onCategoryPress}
      bottomDivider
    >
      {renderImage()}
      {renderContent()}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    padding: 0,
  },
  image: {
    width: DIMENS.categoryListItem.imageWidth,
    height: DIMENS.categoryListItem.imageHeight,
  },
});

export default CategoryListItem;
