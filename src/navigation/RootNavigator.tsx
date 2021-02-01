import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from 'react-native-appearance';
import StackNavigator from './StackNavigator';
import { DrawerScreen } from '../screens';
import { navigationLightTheme, navigationDarkTheme } from '../theme';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      theme={scheme === 'dark' ? navigationDarkTheme : navigationLightTheme}
    >
      <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
        <Drawer.Screen
          name="drawer"
          component={StackNavigator}
          options={{
            swipeEnabled: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
