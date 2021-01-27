import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorParamList, Routes } from '../../navigation';
import { GenericTemplate, MediaGallery } from '../../components';
import { magentoConfig } from '../../../magento.config';
import { DIMENS, SPACING } from '../../constants';
import FeaturedProductList from './FeaturedProductList';
import { StyleSheet } from 'react-native';

type Props = {
  navigation: BottomTabNavigationProp<
    BottomTabNavigatorParamList,
    Routes.NAVIGATION_TO_HOME_SCREEN
  >;
};

const HomeScreen = ({}: Props): React.ReactElement => {
  return (
    <GenericTemplate scrollable>
      <MediaGallery
        resizeMode="cover"
        items={magentoConfig.homeCarousel}
        height={DIMENS.homeScreen.carouselHeight}
        containerStyle={styles.mediaContainer}
      />
      {magentoConfig.homeFeaturedCategories.map(featuredCategory => (
        <FeaturedProductList
          key={String(featuredCategory.id)}
          name={featuredCategory.name}
          categoryId={featuredCategory.id}
        />
      ))}
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    marginBottom: SPACING.large,
  },
});

export default HomeScreen;
