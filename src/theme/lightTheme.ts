import { DefaultTheme } from '@react-navigation/native';
import { lightColors } from './colors';

export const lightTheme = {
  colors: {
    primary: lightColors.primary,
    // secondary
    // white: 'white',
    // black: 'black',
    // grey0: '#f9f9f9',
    // grey1: '#e0e0e0',
    // grey2: '#ced2d9',
    // grey3: '#979da0',
    // grey4: '#6d787e',
    // grey5: '#354052',
    searchBg: '#ebebeb',
    // greyOutline: ,
    // success: '#52c41a',
    // error: '#ff190c',
    // warning: ,
    // divider: '#ced2d9',
  },
};

export const navigationLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    /**
     * Used as tint color in bottombar
     */
    primary: lightColors.secondary,
    background: lightColors.background,
    text: lightColors.primary,
  },
};
