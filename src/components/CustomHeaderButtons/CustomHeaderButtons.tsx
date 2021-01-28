import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HeaderButtons,
  HeaderButton,
  HeaderButtonProps,
  HeaderButtonsProps,
} from 'react-navigation-header-buttons';
import { useTheme } from '@react-navigation/native';

// define IconComponent, color, sizes and OverflowIcon in one place
const CustomHeaderButton = (props: HeaderButtonProps) => {
  const { colors } = useTheme();
  return (
    <HeaderButton
      IconComponent={MaterialIcons}
      iconSize={23}
      color={colors.text}
      {...props}
    />
  );
};

export const CustomHeaderButtons = (props: HeaderButtonsProps) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} {...props} />
  );
};
export { Item as CustomHeaderItem } from 'react-navigation-header-buttons';
