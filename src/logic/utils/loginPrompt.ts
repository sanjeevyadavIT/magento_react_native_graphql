import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { translate } from '../../i18n';
import { AppStackParamList, Routes } from '../../navigation';

export const showLoginPrompt = (
  message: string,
  navigation: StackNavigationProp<AppStackParamList>,
): void => {
  Alert.alert(
    translate('common.dearUser'),
    message,
    [
      {
        text: translate('common.login'),
        onPress: () =>
          navigation.navigate(
            Routes.NAVIGATION_TO_AUTHENTICATION_SPLASH_SCREEN,
            { screen: Routes.NAVIGATION_TO_LOGIN_SCREEN },
          ),
      },
      {
        text: translate('common.signup'),
        onPress: () =>
          navigation.navigate(
            Routes.NAVIGATION_TO_AUTHENTICATION_SPLASH_SCREEN,
            { screen: Routes.NAVIGATION_TO_SIGNUP_SCREEN },
          ),
      },
    ],
    { cancelable: true },
  );
};
