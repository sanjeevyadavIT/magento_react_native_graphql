import React from 'react';
import { FlatList } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { CategoryListItem, GenericTemplate } from '../../components';
import { useCategories } from '../../logic';
import { magentoConfig } from '../../../magento.config';

type Props = {
  navigation: DrawerContentComponentProps;
};

const DrawerScreen = ({ navigation }: Props): React.ReactElement => {
  const { categories, loading, error } = useCategories({
    categoryId: magentoConfig.baseCategoryId,
  });

  return (
    <GenericTemplate loading={loading} errorMessage={error && error.message}>
      <FlatList
        data={categories}
        keyExtractor={item => `categoryItem${item.id.toString()}`}
        renderItem={({ item }) => (
          <CategoryListItem item={item} navigation={navigation} />
        )}
      />
    </GenericTemplate>
  );
};

export default DrawerScreen;
