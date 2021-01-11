import { Routes } from './routeNames';

export type StackParamList = {
  [Routes.NAVIGATION_TO_HOME_SCREEN]: {};
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
