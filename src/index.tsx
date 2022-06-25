import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { graphQLClient } from 'core/api';
import { App } from './app';

const container = document.getElementById('root');

ReactDOM.render(
  <ApolloProvider client={graphQLClient}>
    <App />
  </ApolloProvider>,
  container
);
