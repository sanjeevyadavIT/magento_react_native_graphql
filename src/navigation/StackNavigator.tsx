import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { NAVIGATION_TO_HOME_SCREEN } from './routes';
import { translate } from '../i18n';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={NAVIGATION_TO_HOME_SCREEN}
      component={BottomTabNavigator}
      options={({ navigation }) => ({
        title: translate('common.brand'),
        headerLeft: () => (
          <Button onPress={navigation.toggleDrawer} title="⇶" />
        ),
      })}
    />
  </Stack.Navigator>
);

export default StackNavigator;
