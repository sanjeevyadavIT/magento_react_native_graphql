import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { translate } from '../i18n';
import { HomeScreen, CartScreen, ProfileScreen } from '../screens';
import { Routes } from './routeNames';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.NAVIGATION_TO_HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: translate('homeScreen.appbarTitle'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.NAVIGATION_TO_PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('profileScreen.appbarTitle'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.NAVIGATION_TO_CART_SCREEN}
        component={CartScreen}
        options={{
          tabBarLabel: translate('cartScreen.appbarTitle'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
