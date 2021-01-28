import React, { useEffect, useState } from 'react';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from 'react-native-elements';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import Navigator from './navigation';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { getApolloClient } from './apollo/client';
import { theme } from './theme';
import { Spinner } from './components';

const App = (): React.ReactElement => {
  const [colorScheme, setColorScheme] = useState('light');
  const [client, setClient] = useState<ApolloClient<any>>();

  console.log(colorScheme);

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

  if (client) {
    return (
      <ApolloProvider client={client}>
        <AppearanceProvider>
          <ThemeProvider useDark={colorScheme === 'dark'}>
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
