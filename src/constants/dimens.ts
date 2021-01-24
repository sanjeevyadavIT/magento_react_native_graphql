import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

/**
 * All the dimension related to sizes, should be stored here
 */
const DIMENS = Object.freeze({
  /**
   * App level constants common among all components
   */
  common: {
    WINDOW_WIDTH: screenWidth,
    WINDOW_HEIGHT: screenHeight,
    borderWidth: moderateScale(StyleSheet.hairlineWidth),
    appbarIconSize: moderateScale(23),
  },
  categoryListItem: {
    imageWidth: moderateScale(70),
    imageHeight: moderateScale(70),
  },
  homeScreen: {
    carouselHeight: moderateScale(200),
  },
});

export default DIMENS;
