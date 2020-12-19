import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_CATGEORIES_SCREEN,
} from './routeNames';

export type StackParamList = {
  [NAVIGATION_TO_HOME_SCREEN]: {};
  [NAVIGATION_TO_CATGEORIES_SCREEN]: { categoryId: string; name: string };
};
