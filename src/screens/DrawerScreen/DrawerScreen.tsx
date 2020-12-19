import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { CategoryListItem } from '../../components';
import { useCategories } from '../../logic';
import { magentoConfig } from '../../../magento.config';

type Props = {
  navigation: DrawerContentComponentProps;
};

const DrawerScreen = ({ navigation }: Props): React.ReactElement => {
  const { categories, loading, error } = useCategories({
    categoryId: magentoConfig.baseCategoryId,
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={item => `catgeoryItem${item.id.toString()}`}
        renderItem={({ item }) => (
          <CategoryListItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default DrawerScreen;
