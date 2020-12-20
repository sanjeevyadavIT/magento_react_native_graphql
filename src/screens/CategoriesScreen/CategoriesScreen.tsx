import React from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryListItem } from '../../components';
import { useCategories } from '../../logic';
import {
  StackParamList,
  NAVIGATION_TO_CATEGORIES_SCREEN,
} from '../../navigation';

type Props = {
  navigation: StackNavigationProp<
    StackParamList,
    NAVIGATION_TO_CATEGORIES_SCREEN
  >;
  route: RouteProp<StackParamList, NAVIGATION_TO_CATEGORIES_SCREEN>;
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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={item => `categoryItem${item.id.toString()}`}
        renderItem={({ item }) => (
          <CategoryListItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default CategoriesScreen;
