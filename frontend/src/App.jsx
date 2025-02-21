import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import TaskList from './components/TaskList';

function App() {
  return (
    <ApolloProvider client={client}>
      <TaskList />
    </ApolloProvider>
  );
}

export default App;
