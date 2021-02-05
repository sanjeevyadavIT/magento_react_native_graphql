import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { showMessage } from 'react-native-flash-message';
import { translate } from '../../i18n';
import { AutheticationStackParamList, Routes } from '../../navigation';
import { SPACING } from '../../constants';
import { GenericTemplate } from '../../components';
import { useSignup } from '../../logic';

type Props = {
  navigation: StackNavigationProp<
    AutheticationStackParamList,
    Routes.NAVIGATION_TO_LOGIN_SCREEN
  >;
};

const SignupScreen = ({ navigation }: Props): React.ReactElement => {
  const {
    values,
    loading,
    data,
    error,
    handleChange,
    handleSubmit,
  } = useSignup();

  useEffect(() => {
    if (data?.createCustomerV2?.customer?.email) {
      showMessage({
        message: translate('common.success'),
        description: translate('signupScreen.successMessage'),
        type: 'success',
      });
      navigation.replace(Routes.NAVIGATION_TO_LOGIN_SCREEN);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      showMessage({
        message: translate('common.error'),
        description: error.message ?? translate('errors.genericError'),
        type: 'danger',
      });
    }
  }, [error]);

  return (
    <GenericTemplate scrollable style={styles.container}>
      <Input
        placeholder="Joe"
        value={values.firstName}
        editable={!loading}
        label={translate('common.firstName')}
        onChangeText={handleChange('firstName')}
      />
      <Input
        placeholder="Ranger"
        value={values.lastName}
        editable={!loading}
        label={translate('common.lastName')}
        onChangeText={handleChange('lastName')}
      />
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
        title={translate('common.register')}
        containerStyle={styles.submitButton}
      />
      <Button
        type="clear"
        disabled={loading}
        title={translate('signupScreen.haveAccount')}
        onPress={() => navigation.navigate(Routes.NAVIGATION_TO_LOGIN_SCREEN)}
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

export default SignupScreen;
