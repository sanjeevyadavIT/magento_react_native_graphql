import { NavigatorScreenParams } from '@react-navigation/native';
import { Routes } from './routeNames';

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
};

export type AutheticationStackParamList = {
  [Routes.NAVIGATION_TO_LOGIN_SCREEN]: undefined;
  [Routes.NAVIGATION_TO_SIGNUP_SCREEN]: undefined;
};

export type BottomTabNavigatorParamList = {
  [Routes.NAVIGATION_TO_HOME_SCREEN]: undefined;
  [Routes.NAVIGATION_TO_PROFILE_SCREEN]: undefined;
  [Routes.NAVIGATION_TO_CART_SCREEN]: undefined;
};
