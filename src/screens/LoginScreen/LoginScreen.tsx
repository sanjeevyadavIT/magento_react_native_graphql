import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-simple-toast';
import { useLogin } from '../../logic';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { GenericTemplate } from '../../components';
import {
  AutheticationStackParamList,
  AppStackParamList,
  Routes,
} from '../../navigation';

type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    AutheticationStackParamList,
    Routes.NAVIGATION_TO_LOGIN_SCREEN
  >,
  StackNavigationProp<AppStackParamList>
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props): React.ReactElement => {
  const {
    values,
    loading,
    data,
    error,
    handleChange,
    handleSubmit,
  } = useLogin();

  useEffect(() => {
    if (data?.generateCustomerToken?.token) {
      Toast.show(translate('loginScreen.successMessage', Toast.LONG));
      navigation.navigate(Routes.NAVIGATION_TO_HOME_SCREEN);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Toast.show(error.message ?? translate('errors.genericError'), Toast.LONG);
    }
  }, [error]);

  return (
    <GenericTemplate style={styles.container}>
      <Input
        value={values.email}
        editable={!loading}
        leftIcon={{ name: 'email' }}
        placeholder="email@address.com"
        label={translate('common.email')}
        onChangeText={handleChange('email')}
      />
      <Input
        secureTextEntry={values.secureTextEntry}
        editable={!loading}
        value={values.password}
        leftIcon={{ name: 'lock' }}
        rightIcon={{
          name: values.secureTextEntry ? 'eye' : 'eye-off',
          type: 'material-community',
          onPress: handleChange('secureTextEntry').bind(
            {},
            !values.secureTextEntry,
          ),
        }}
        label={translate('common.password')}
        onChangeText={handleChange('password')}
        placeholder={translate('common.password')}
      />
      <Button
        loading={loading}
        onPress={handleSubmit}
        title={translate('common.login')}
        containerStyle={styles.submitButton}
      />
      <Button
        type="clear"
        disabled={loading}
        title={translate('loginScreen.noAccount')}
        onPress={() => navigation.navigate(Routes.NAVIGATION_TO_SIGNUP_SCREEN)}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
  },
  submitButton: {
    marginBottom: SPACING.large,
  },
});

export default LoginScreen;
