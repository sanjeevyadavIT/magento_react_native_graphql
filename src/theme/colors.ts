/**
 * Note: Don't use the variables directly in code
 * use colors from lightTheme and darkTheme
 */

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  sucess: string;
  error: string;
  warning: string;
  info: string;
}

const BLACK = '#000';
const PRIMARY_COLOR = '#333333';
const SECONDARY_COLOR = '#FF7900';
const BACKGROUND_COLOR = '#fbfbfb';
const SUCCESS_COLOR = '#00C851';
const SUCCESS_DARK_COLOR = '#007E33';
const ERROR_COLOR = '#ff4444';
const ERROR_DARK_COLOR = '#CC0000';
const WARNING_COLOR = '#ffbb33';
const WARNING_DARK_COLOR = '#FF8800';
const INFO_COLOR = '#33b5e5';
const INFO_DARK_COLOR = '#0099CC';

export const lightColors: Colors = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  background: BACKGROUND_COLOR,
  sucess: SUCCESS_COLOR,
  error: ERROR_COLOR,
  warning: WARNING_COLOR,
  info: INFO_COLOR,
};

export const darkColors: Colors = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  background: BLACK,
  sucess: SUCCESS_DARK_COLOR,
  error: ERROR_DARK_COLOR,
  warning: WARNING_DARK_COLOR,
  info: INFO_DARK_COLOR,
};
