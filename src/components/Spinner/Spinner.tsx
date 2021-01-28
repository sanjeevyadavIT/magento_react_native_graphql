import React, { useContext } from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { ThemeContext } from 'react-native-elements';

interface Props {
  /**
   * size of the spinner, can be
   * 1. 'large'
   * 2. 'small'
   */
  size?: 'large' | 'small';
  /**
   * custom color for the spinner
   */
  color?: string;
  /**
   * style containing padding & margin
   */
  style?: ViewStyle;
}

const Spinner = ({
  size = 'large',
  color,
  style = {},
}: Props): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  return (
    <ActivityIndicator
      style={style}
      size={size}
      color={color ?? theme.colors?.primary}
    />
  );
};

export default Spinner;
