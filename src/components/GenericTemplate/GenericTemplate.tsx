import React, { useContext, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { SPACING } from '../../constants';
import { Text } from 'react-native-elements';

interface Props {
  /**
   * Element to be render when no loading and no error
   */
  children: ReactNode;
  /**
   * Render spinner at center
   */
  loading?: boolean;
  /**
   * Add children in ScrollView component
   */
  scrollable?: boolean;
  /**
   * Add sticky Footer at bottom
   */
  footer?: ReactNode;
  /**
   * in case of status === Status.ERROR, the error message to be shown
   */
  errorMessage?: string;
  /**
   * Container style that wrap children except footer component
   */
  style: ViewStyle;
}

const GenericTemplate = ({
  children,
  footer,
  scrollable = false,
  loading = false,
  errorMessage,
  style = {},
}: Props): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;

  const renderLoader = () =>
    loading && (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors?.primary} />
      </View>
    );

  const renderError = () =>
    !loading &&
    !!errorMessage && (
      <View style={styles.center}>
        <Text>{errorMessage}</Text>
      </View>
    );

  const renderContent = () => !loading && !errorMessage && children;

  return (
    <>
      <ViewGroup style={[styles.container, style]}>
        {renderLoader()}
        {renderError()}
        {renderContent()}
      </ViewGroup>
      {!loading && footer}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large,
  },
});

export default GenericTemplate;
