import RootNavigator from './RootNavigator';
import type { BottomTabNavigatorParamList } from './BottomTabNavigator';
import type { AutheticationStackParamList } from './AuthenticationNavigator';
import type { AppStackParamList } from './StackNavigator';

/**
 * Only one default export will be there,
 * which will be a top level navigator.
 */
export default RootNavigator;
export * from './routeNames';
export type {
  AppStackParamList,
  BottomTabNavigatorParamList,
  AutheticationStackParamList,
};
