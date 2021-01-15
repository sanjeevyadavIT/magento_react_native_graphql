import React from 'react';
import { Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { translate } from '../i18n';
import { HomeScreen, CartScreen, ProfileScreen } from '../screens';
import { Routes } from './routeNames';
import { IS_LOGGED_IN, IsLoggedInDataType } from '../apollo/queries/isLoggedIn';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  const { data } = useQuery<IsLoggedInDataType>(IS_LOGGED_IN);
  const showLoginPrompt = (message: string): void => {
    Alert.alert(
      translate('common.dearUser'),
      message,
      [
        {
          text: translate('common.login'),
          onPress: () =>
            navigation.navigate(
              Routes.NAVIGATION_TO_AUTHENTICATION_SPLASH_SCREEN,
              { screen: Routes.NAVIGATION_TO_LOGIN_SCREEN },
            ),
        },
        {
          text: translate('common.signup'),
          onPress: () =>
            navigation.navigate(
              Routes.NAVIGATION_TO_AUTHENTICATION_SPLASH_SCREEN,
              { screen: Routes.NAVIGATION_TO_SIGNUP_SCREEN },
            ),
        },
      ],
      { cancelable: true },
    );
  };

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
        listeners={{
          tabPress: e => {
            if (!data?.isLoggedIn) {
              // Prevent default action
              e.preventDefault();
              showLoginPrompt(
                translate('profileScreen.guestUserPromptMessage'),
              );
            }
          },
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
        listeners={{
          tabPress: e => {
            if (!data?.isLoggedIn) {
              // Prevent default action
              e.preventDefault();
              showLoginPrompt(translate('cartScreen.guestUserPromptMessage'));
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
