import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_PRODUCT_LIST_SCREEN,
  NAVIGATION_TO_CATEGORIES_SCREEN,
} from './routeNames';

export type StackParamList = {
  [NAVIGATION_TO_HOME_SCREEN]: {};
  [NAVIGATION_TO_CATEGORIES_SCREEN]: {
    categoryId: string;
    name: string;
  };
  [NAVIGATION_TO_PRODUCT_LIST_SCREEN]: {
    categoryId: string;
    name: string;
  };
};
