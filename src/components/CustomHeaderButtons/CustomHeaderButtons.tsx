import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HeaderButtons,
  HeaderButton,
  HeaderButtonProps,
  HeaderButtonsProps,
} from 'react-navigation-header-buttons';

// define IconComponent, color, sizes and OverflowIcon in one place
const CustomHeaderButton = (props: HeaderButtonProps) => (
  <HeaderButton
    IconComponent={MaterialIcons}
    iconSize={23}
    color="black"
    {...props}
  />
);

export const CustomHeaderButtons = (props: HeaderButtonsProps) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} {...props} />
  );
};
export { Item as CustomHeaderItem } from 'react-navigation-header-buttons';
