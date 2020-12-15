import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../apollo/queries/getCategories';
import { magentoConfig } from '../../../magento.config';

const CategoriesScreen = () => {
  const [getCategories, { called, loading, data, error }] = useLazyQuery(
    GET_CATEGORIES,
    {
      variables: {
        id: magentoConfig.baseCategoryId,
      },
    },
  );

  useEffect(() => {
    if (!called) {
      getCategories();
    }
  }, [called]);

  if (!called && loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>{JSON.stringify(data ? data : error)}</Text>
    </View>
  );
};

export default CategoriesScreen;
