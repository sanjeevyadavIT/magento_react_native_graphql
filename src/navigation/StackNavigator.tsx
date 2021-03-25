import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import AuthenticationNavigator from './AuthenticationNavigator';
import { CustomHeaderButtons, CustomHeaderItem } from '../components';
import { Routes } from './routeNames';
import { translate } from '../i18n';
import {
  SearchScreen,
  CategoriesScreen,
  ProductListScreen,
  ProductDetailsScreen,
} from '../screens';

export type AppStackParamList = {
  [Routes.NAVIGATION_TO_HOME_SCREEN]: undefined;
  [Routes.NAVIGATION_TO_AUTHENTICATION_SPLASH_SCREEN]: NavigatorScreenParams<AutheticationStackParamList>;
  [Routes.NAVIGATION_TO_CATEGORIES_SCREEN]: {
    categoryId: string;
    name: string;
  };
  [Routes.NAVIGATION_TO_PRODUCT_LIST_SCREEN]: {
    categoryId: string;
    name: string;
  };
  [Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN]: {
    name: string;
    sku: string;
  };
  [Routes.NAVIGATION_TO_SEARCH_SCREEN]: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

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
        headerRight: () => (
          <CustomHeaderButtons>
            <CustomHeaderItem
              title={translate('common.search')}
              iconName="search"
              onPress={() =>
                navigation.navigate(Routes.NAVIGATION_TO_SEARCH_SCREEN)
              }
            />
          </CustomHeaderButtons>
        ),
      })}
    />
    <Stack.Screen
      name={Routes.NAVIGATION_TO_AUTHENTICATION_SPLASH_SCREEN}
      component={AuthenticationNavigator}
      options={{
        headerShown: false,
      }}
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
    <Stack.Screen
      name={Routes.NAVIGATION_TO_SEARCH_SCREEN}
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
