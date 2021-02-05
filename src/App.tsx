import React, { useEffect, useState } from 'react';
import {
  Appearance,
  AppearanceProvider,
  ColorSchemeName,
} from 'react-native-appearance';
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
  const [ready, setReady] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>();
  const [client, setClient] = useState<ApolloClient<any>>();

  useEffect(() => {
    getApolloClient()
      .then(setClient)
      .catch(e => console.log(e));

    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }) => {
        // do something with color scheme
        setColorScheme(newColorScheme);
        const theme = newColorScheme === 'dark' ? darkTheme : lightTheme;
        FlashMessage.setColorTheme({
          success: theme.colors.success,
          info: theme.colors.info,
          warning: theme.colors.warning,
          danger: theme.colors.error,
        });
      },
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme());
    setReady(true);
  }, []);

  if (ready && client) {
    return (
      <ApolloProvider client={client}>
        <AppearanceProvider>
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
        </AppearanceProvider>
      </ApolloProvider>
    );
  }

  // TODO: SplashScreen logic
  return <Spinner />;
};

export default App;
