/**
 * Note: Don't use the variables directly in code
 * use colors from lightTheme and darkTheme
 */

interface Colors {
  primary: string;
  secondary: string;
  background: string;
}

const WHITE = '#fff';
const BLACK = '#000';
const PRIMARY_COLOR = '#333333';
const SECONDARY_COLOR = '#FF7900';
const BACKGROUND_COLOR = '#fbfbfb';

export const lightColors: Colors = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  background: BACKGROUND_COLOR,
};

export const darkColors: Colors = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  background: BLACK,
};
