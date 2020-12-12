import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => <Text>Home</Text>;

const CategoriesScreen = () => <Text>Category</Text>;

const ProfileScreen = () => <Text>Profile</Text>;

const CartScreen = () => <Text>Cart</Text>;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoriesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
