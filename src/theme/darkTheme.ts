import { DarkTheme } from '@react-navigation/native';
import { darkColors } from './colors';

export const darkTheme = {
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
    // success: '#52c41a',
    // error: '#ff190c',
    // warning: ,
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
