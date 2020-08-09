import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import apollo from './services/apollo';

import Routes from './Routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apollo}>
        <Routes />
      </ApolloProvider>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
