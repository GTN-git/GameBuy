import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import {
  InMemoryCache
} from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMedia } from "@artsy/fresnel";
import ApolloClient from 'apollo-boost';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';


const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920
  }
});
const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <style>{mediaStyles}</style>
          <MediaContextProvider>
            <Navbar Media={Media}/>
            <img src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/login' component={Login} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
          </MediaContextProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
