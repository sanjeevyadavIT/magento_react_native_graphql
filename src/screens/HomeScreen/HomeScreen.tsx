import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorParamList, Routes } from '../../navigation';
import { GenericTemplate, MediaGallery } from '../../components';
import { magentoConfig } from '../../../magento.config';
import { DIMENS } from '../../constants';
import { Button } from 'react-native-elements';

type Props = {
  navigation: BottomTabNavigationProp<
    BottomTabNavigatorParamList,
    Routes.NAVIGATION_TO_HOME_SCREEN
  >;
};

const HomeScreen = ({ navigation }: Props): React.ReactElement => {
  return (
    <GenericTemplate>
      <MediaGallery
        resizeMode="cover"
        items={magentoConfig.homeCarousel}
        height={DIMENS.homeScreen.carouselHeight}
      />
      <Button title="Shop Now" onPress={navigation.openDrawer} />
    </GenericTemplate>
  );
};

export default HomeScreen;
