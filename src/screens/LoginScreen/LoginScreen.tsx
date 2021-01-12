import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { translate } from '../../i18n';
import { AutheticationStackParamList, Routes } from '../../navigation';

type Props = {
  navigation: StackNavigationProp<
    AutheticationStackParamList,
    Routes.NAVIGATION_TO_LOGIN_SCREEN
  >;
};

const LoginScreen = ({ navigation }: Props): React.ReactElement => (
  <View>
    <Text>Login</Text>
    <Button
      title={translate('loginScreen.noAccount')}
      onPress={() => navigation.navigate(Routes.NAVIGATION_TO_SIGNUP_SCREEN)}
    />
  </View>
);

export default LoginScreen;
