import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import { DrawerScreen } from '../screens';
import { useCart } from '../logic/cart/useCart';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const { cartId } = useCart();
  return (
    <NavigationContainer>
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
