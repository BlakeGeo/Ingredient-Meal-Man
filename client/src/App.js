import React from "react";
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Box w="100%" bgGradient="linear(to-r, blue.100, cyan.300)">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
          <Footer />
        </Box>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
