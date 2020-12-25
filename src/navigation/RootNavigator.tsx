import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }): React.ReactElement => (
  <View>
    <Button
      title="Open Alert Dialog"
      onPress={() =>
        navigation.navigate('dialog', {
          dismissible: true,
          title: 'Hello',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It',
        })
      }
    />
  </View>
);

const Dialog = () => (
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)' }}>
    <Text>Dialog</Text>
  </View>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
        }}
      >
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'dialog'} component={Dialog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
