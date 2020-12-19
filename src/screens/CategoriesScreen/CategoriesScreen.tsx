import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryListItem } from '../../components';
import { useCategories } from '../../logic';
import {
  StackParamList,
  NAVIGATION_TO_CATGEORIES_SCREEN,
} from '../../navigation';

type Props = {
  navigation: StackNavigationProp<
    StackParamList,
    NAVIGATION_TO_CATGEORIES_SCREEN
  >;
  route: RouteProp<StackParamList, NAVIGATION_TO_CATGEORIES_SCREEN>;
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

export default CategoriesScreen;
