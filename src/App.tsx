import React, { useEffect, useState } from 'react';
import {
  Appearance,
  AppearanceProvider,
  ColorSchemeName,
} from 'react-native-appearance';
import { ThemeProvider } from 'react-native-elements';
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
          <ThemeProvider
            useDark={colorScheme === 'dark'}
            theme={colorScheme === 'dark' ? darkTheme : lightTheme}
          >
            <OverflowMenuProvider>
              <Navigator />
            </OverflowMenuProvider>
          </ThemeProvider>
        </AppearanceProvider>
      </ApolloProvider>
    );
  }

  // TODO: SplashScreen logic
  return <Spinner />;
};

export default App;
