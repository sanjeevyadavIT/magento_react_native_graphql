import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { translate } from '../../i18n';
import { AutheticationStackParamList, Routes } from '../../navigation';
import { SPACING } from '../../constants';
import { GenericTemplate } from '../../components';
import { useForm } from '../../logic';

type Props = {
  navigation: StackNavigationProp<
    AutheticationStackParamList,
    Routes.NAVIGATION_TO_LOGIN_SCREEN
  >;
};

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  secureTextEntry: boolean;
}

const SignupScreen = ({ navigation }: Props): React.ReactElement => {
  const { values, handleChange, handleSubmit } = useForm<SignupForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      secureTextEntry: true,
    },
    onSubmit: async _values => {
      console.log(_values);
    },
  });

  return (
    <GenericTemplate scrollable style={styles.container}>
      <Input
        placeholder="Joe"
        value={values.firstName}
        label={translate('common.firstName')}
        onChangeText={handleChange('firstName')}
      />
      <Input
        placeholder="Ranger"
        value={values.lastName}
        label={translate('common.lastName')}
        onChangeText={handleChange('lastName')}
      />
      <Input
        value={values.email}
        leftIcon={{ name: 'email' }}
        placeholder="email@address.com"
        label={translate('common.email')}
        onChangeText={handleChange('email')}
      />
      <Input
        secureTextEntry={values.secureTextEntry}
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
        title={translate('common.register')}
        onPress={handleSubmit}
        containerStyle={styles.submitButton}
      />
      <Button
        type="clear"
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
