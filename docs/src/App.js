import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Firebase
import firebase from 'firebase';

// Components
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

const { auth } = firebase;

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
  };

  componentDidMount() {
    this.authListener = auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true, user });
      } else {
        this.setState({ loggedIn: false, user: null });
      }
    });
  }

  componentWillUnmount() {
    // Unmount the authListener when the component unmounts
    this.authListener();
  }

  render() {
    const { loggedIn, user } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedIn ? <Redirect to="/home" /> : <LoginScreen />
            }
          />

          <Route
            path="/home"
            render={() =>
              loggedIn ? <HomeScreen user={user} /> : <Redirect to="/" />
            }
          />

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
