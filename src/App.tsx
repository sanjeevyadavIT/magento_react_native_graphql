import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import Navigator from './navigation';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client';

const App = (): React.ReactElement => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <OverflowMenuProvider>
          <Navigator />
        </OverflowMenuProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
