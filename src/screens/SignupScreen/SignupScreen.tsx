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

const SignupScreen = ({ navigation }: Props): React.ReactElement => (
  <View>
    <Text>Sign Up</Text>
    <Button
      title={translate('common.login')}
      onPress={() => navigation.navigate(Routes.NAVIGATION_TO_LOGIN_SCREEN)}
    />
  </View>
);

export default SignupScreen;
