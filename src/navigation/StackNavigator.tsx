import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_PRODUCT_LIST_SCREEN,
  NAVIGATION_TO_PRODUCT_DETAILS_SCREEN,
  NAVIGATION_TO_CATEGORIES_SCREEN,
} from './routeNames';
import { StackParamList } from './routeParams';
import { translate } from '../i18n';
import {
  CategoriesScreen,
  ProductListScreen,
  ProductDetailsScreen,
} from '../screens';

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={NAVIGATION_TO_HOME_SCREEN}
      component={BottomTabNavigator}
      options={({ navigation }) => ({
        title: translate('common.brand'),
        headerLeft: () => (
          <Button onPress={navigation.toggleDrawer} title="⇶" />
        ),
      })}
    />
    <Stack.Screen
      name={NAVIGATION_TO_CATEGORIES_SCREEN}
      component={CategoriesScreen}
      options={({ route }) => {
        const {
          params: { name },
        } = route;
        return {
          title: name ?? translate('categoriesScreen.appbarTitle'),
        };
      }}
    />
    <Stack.Screen
      name={NAVIGATION_TO_PRODUCT_LIST_SCREEN}
      component={ProductListScreen}
      options={({ route }) => {
        const {
          params: { name },
        } = route;
        return {
          title: name ?? translate('productListScreen.appbarTitle'),
        };
      }}
    />
    <Stack.Screen
      name={NAVIGATION_TO_PRODUCT_DETAILS_SCREEN}
      component={ProductDetailsScreen}
      options={({ route }) => {
        const {
          params: { name },
        } = route;
        return {
          title: name ?? translate('productDetailsScreen.appbarTitle'),
        };
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
