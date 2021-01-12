import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routeNames';
import { AutheticationStackParamList } from './routeParams';
import { translate } from '../i18n';
import { LoginScreen, SignupScreen } from '../screens';

const AuthStack = createStackNavigator<AutheticationStackParamList>();

const AuthenticationNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name={Routes.NAVIGATION_TO_LOGIN_SCREEN}
      component={LoginScreen}
      options={{
        title: translate('loginScreen.appbarTitle'),
      }}
    />
    <AuthStack.Screen
      name={Routes.NAVIGATION_TO_SIGNUP_SCREEN}
      component={SignupScreen}
      options={{
        title: translate('signupScreen.appbarTitle'),
      }}
    />
  </AuthStack.Navigator>
);

export default AuthenticationNavigator;
