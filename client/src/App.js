import React from "react";
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient} from '@apollo/client';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from '/pages/Home';
import Profile from './pages/Profile';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
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
