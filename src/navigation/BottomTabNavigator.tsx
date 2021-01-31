import React from 'react';
import { useQuery } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { translate } from '../i18n';
import { HomeScreen, CartScreen, ProfileScreen } from '../screens';
import { Routes } from './routeNames';
import { AppStackParamList, BottomTabNavigatorParamList } from './routeParams';
import { IS_LOGGED_IN, IsLoggedInDataType } from '../apollo/queries/isLoggedIn';
import { showLoginPrompt } from '../logic';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

type Props = {
  navigation: StackNavigationProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_HOME_SCREEN
  >;
};

const BottomTabNavigator = ({ navigation }: Props) => {
  const { data } = useQuery<IsLoggedInDataType>(IS_LOGGED_IN);

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
                navigation,
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
              showLoginPrompt(
                translate('cartScreen.guestUserPromptMessage'),
                navigation,
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
