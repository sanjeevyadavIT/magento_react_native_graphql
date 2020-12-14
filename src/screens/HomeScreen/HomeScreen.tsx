import React from 'react';
import { View, Text } from 'react-native';
import { translate } from '../../i18n';

const HomeScreen = () => (
  <View>
    <Text>{translate('common.pluralizationExample', { count: 0 })}</Text>
    <Text>{translate('common.pluralizationExample', { count: 10 })}</Text>
    <Text>{translate('common.pluralizationExample', { count: 1 })}</Text>
  </View>
);

export default HomeScreen;
