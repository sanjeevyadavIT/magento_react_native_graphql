import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import Navigator from './navigation';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { getApolloClient } from './apollo/client';
import { theme } from './theme';
import { ActivityIndicator } from 'react-native';

const App = (): React.ReactElement => {
  const [client, setClient] = useState<ApolloClient<any>>();

  useEffect(() => {
    getApolloClient()
      .then(setClient)
      .catch(e => console.log(e));
  }, []);

  if (client) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <OverflowMenuProvider>
            <Navigator />
          </OverflowMenuProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }

  // TODO: SplashScreen logic
  return <ActivityIndicator size="large" />;
};

export default App;
