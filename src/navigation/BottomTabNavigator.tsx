import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { translate } from '../i18n';
import {
  HomeScreen,
  CategoriesScreen,
  CartScreen,
  ProfileScreen,
} from '../screens';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_CATGEORIES_SCREEN,
  NAVIGATION_TO_CART_SCREEN,
  NAVIGATION_TO_PROFILE_SCREEN,
} from './routes';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={NAVIGATION_TO_HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: translate('homeScreen.appbarTitle'),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TO_CATGEORIES_SCREEN}
        component={CategoriesScreen}
        options={{
          tabBarLabel: translate('categoriesScreen.appbarTitle'),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TO_PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('profileScreen.appbarTitle'),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TO_CART_SCREEN}
        component={CartScreen}
        options={{
          tabBarLabel: translate('cartScreen.appbarTitle'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
