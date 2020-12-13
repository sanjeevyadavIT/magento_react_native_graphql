import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { translate } from '../i18n';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View>
    <Text>{translate('common.pluralizationExample', { count: 0 })}</Text>
    <Text>{translate('common.pluralizationExample', { count: 10 })}</Text>
    <Text>{translate('common.pluralizationExample', { count: 1 })}</Text>
  </View>
);

const CategoriesScreen = () => <Text>Category</Text>;

const ProfileScreen = () => <Text>Profile</Text>;

const CartScreen = () => <Text>Cart</Text>;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={translate('homeScreen.appbarTitle')}
        component={HomeScreen}
      />
      <Tab.Screen
        name={translate('categoriesScreen.appbarTitle')}
        component={CategoriesScreen}
      />
      <Tab.Screen
        name={translate('profileScreen.appbarTitle')}
        component={ProfileScreen}
      />
      <Tab.Screen
        name={translate('cartScreen.appbarTitle')}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
