import React, { useEffect } from 'react';
import { View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button, Text } from 'react-native-elements';
import { GenericTemplate } from '../../components';
import { translate } from '../../i18n';
import { useCustomer, useLogout } from '../../logic';
import { BottomTabNavigatorParamList, Routes } from '../../navigation';

type Props = {
  navigation: BottomTabNavigationProp<
    BottomTabNavigatorParamList,
    Routes.NAVIGATION_TO_PROFILE_SCREEN
  >;
};

const ProfileScreen = ({ navigation }: Props): React.ReactElement => {
  const { getCustomer, data, loading, error } = useCustomer();
  const { logout } = useLogout();

  useEffect(() => {
    getCustomer();
  }, []);

  const handleLogout = () => {
    logout();
    navigation.jumpTo(Routes.NAVIGATION_TO_HOME_SCREEN);
  };

  if (error?.message) {
    return (
      <View>
        <Text>{error.message}</Text>
        <Button title={translate('common.logout')} onPress={handleLogout} />
      </View>
    );
  }

  return (
    <GenericTemplate loading={loading}>
      <Text>
        {translate('profileScreen.greeting', {
          name: data?.customer?.firstName ?? translate('common.user'),
        })}
      </Text>
      <Button title={translate('common.logout')} onPress={handleLogout} />
    </GenericTemplate>
  );
};

export default ProfileScreen;
