import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { CustomHeaderButtons, CustomHeaderItem } from '../components';
import { Routes } from './routeNames';
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
      name={Routes.NAVIGATION_TO_HOME_SCREEN}
      component={BottomTabNavigator}
      options={({ navigation }) => ({
        title: translate('common.brand'),
        headerLeft: () => (
          <CustomHeaderButtons>
            <CustomHeaderItem
              title={translate('common.menu')}
              iconName="menu"
              onPress={navigation.toggleDrawer}
            />
          </CustomHeaderButtons>
        ),
      })}
    />
    <Stack.Screen
      name={Routes.NAVIGATION_TO_CATEGORIES_SCREEN}
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
      name={Routes.NAVIGATION_TO_PRODUCT_LIST_SCREEN}
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
      name={Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN}
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
