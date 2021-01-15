import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { translate } from '../../i18n';
import { useLogout } from '../../logic';
import { Routes } from '../../navigation';

const ProfileScreen = ({ navigation }): React.ReactElement => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigation.jumpTo(Routes.NAVIGATION_TO_HOME_SCREEN);
  };

  return (
    <View>
      <Text>Welcome User!</Text>
      <Button title={translate('common.logout')} onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
