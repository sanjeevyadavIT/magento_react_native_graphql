/**
 * NOTE:
 *
 * Spacing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * To scale or shrink overall spacing, change @param baseSpacing value.
 *
 * Feel free to delete this block.
 */
import { moderateScale } from 'react-native-size-matters';

const baseSpacing = 10;

const SPACING = Object.freeze({
  tiny: moderateScale(baseSpacing * 0.4),
  small: moderateScale(baseSpacing * 0.8),
  medium: moderateScale(baseSpacing * 1.2),
  large: moderateScale(baseSpacing * 1.6),
  extraLarge: moderateScale(baseSpacing * 2.4),
});

export default SPACING;
