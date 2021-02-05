import { DarkTheme } from '@react-navigation/native';
import { darkColors } from './colors';
import { typography } from './typography';

export const darkTheme = {
  ...typography,
  colors: {
    primary: darkColors.secondary,
    // secondary
    // white: 'white',
    // black: 'black',
    // grey0: '#f9f9f9',
    // grey1: '#e0e0e0',
    // grey2: '#ced2d9',
    // grey3: '#979da0',
    // grey4: '#6d787e',
    // grey5: '#354052',
    // searchBg
    // greyOutline: ,
    success: darkColors.sucess,
    error: darkColors.error,
    warning: darkColors.warning,
    info: darkColors.info,
    // divider: '#ced2d9',
  },
};

export const navigationDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    /**
     * Used as tint color in bottombar
     */
    primary: '#fff',
  },
};
