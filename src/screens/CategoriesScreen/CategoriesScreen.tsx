import React from 'react';
import { FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryListItem, GenericTemplate } from '../../components';
import { useCategories } from '../../logic';
import { StackParamList } from '../../navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'CategoriesScreen'>;
  route: RouteProp<StackParamList, 'CategoriesScreen'>;
};

const CategoriesScreen = ({
  navigation,
  route: {
    params: { categoryId },
  },
}: Props): React.ReactElement => {
  const { categories, loading, error } = useCategories({
    categoryId,
  });

  return (
    <GenericTemplate loading={loading} errorMessage={error?.message}>
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

export default CategoriesScreen;
