import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from 'react-native-appearance';
import StackNavigator from './StackNavigator';
import { DrawerScreen } from '../screens';
import { useCart } from '../logic/cart/useCart';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const scheme = useColorScheme();
  const { cartId } = useCart();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
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
