import React, { useEffect, useState } from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import Navigator from './navigation';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { getApolloClient } from './apollo/client';
import { lightTheme, darkTheme } from './theme';
import { Spinner } from './components';

const App = (): React.ReactElement => {
  const [client, setClient] = useState<ApolloClient<any>>();
  const colorScheme: ColorSchemeName = useColorScheme();

  useEffect(() => {
    getApolloClient()
      .then(setClient)
      .catch(e => console.log(e));

    const listener = ({
      colorScheme: newColorScheme,
    }: {
      colorScheme: ColorSchemeName;
    }) => {
      // do something when color scheme changes
      const theme = newColorScheme === 'dark' ? darkTheme : lightTheme;
      FlashMessage.setColorTheme({
        success: theme.colors.success,
        info: theme.colors.info,
        warning: theme.colors.warning,
        danger: theme.colors.error,
      });
    };

    Appearance.addChangeListener(listener);

    return () => Appearance.removeChangeListener(listener);
  }, []);

  if (client) {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <ThemeProvider
            useDark={colorScheme === 'dark'}
            theme={colorScheme === 'dark' ? darkTheme : lightTheme}
          >
            <>
              <OverflowMenuProvider>
                <Navigator />
              </OverflowMenuProvider>
              <FlashMessage position="top" />
            </>
          </ThemeProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }

  // TODO: SplashScreen logic
  return <Spinner />;
};

export default App;
