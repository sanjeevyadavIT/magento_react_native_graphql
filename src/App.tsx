import React from 'react';
import Navigator from './navigation';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client';

const App = (): React.ReactElement => {
  return (
    <ApolloProvider client={apolloClient}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
