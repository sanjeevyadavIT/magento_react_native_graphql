import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useCategories } from '../../logic';
import { magentoConfig } from '../../../magento.config';

const DrawerScreen = () => {
  const { categories, loading, error } = useCategories({
    categoryId: magentoConfig.baseCategoryId,
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>{JSON.stringify(categories.length ? categories : error)}</Text>
    </View>
  );
};

export default DrawerScreen;
