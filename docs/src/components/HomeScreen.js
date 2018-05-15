import React, { Component } from 'react';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import Confetti from 'react-dom-confetti';

import 'firebase/auth';

const Container = styled.div`
  padding: 50px 15% 0px 15%;
  background: #fff;
  color: #424242;
  height: 100vh;
  margin-bottom: 50px;
`;
const config = {
  angle: 90,
  spread: 150,
  startVelocity: 45,
  elementCount: 150,
  decay: 0.9,
};

class HomeScreen extends Component {
  state = {
    showConfetti: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showConfetti: true,
      });
    }, 10);
  }

  logout = () => firebase.auth().signOut();

  render() {
    return (
      <Container>
        <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
          <Confetti active={this.state.showConfetti} config={config} />
        </div>
        <Button variant="raised" color="secondary" onClick={this.logout}>
          LOGOUT
        </Button>
        <h2>You've just been authenticated with Frothy!</h2>

        <p>
          This demo is using the Firebase <code>onAuthStateChanged</code>{' '}
          listener along with React-Router to control route navigation based on
          the authentication state.
        </p>
        <p>
          If you try to navigate back to the login screen, you should be
          redirected back to this /home route. Conversely, if you try to
          navigate to this /home route while not logged in, you should be
          redirected back to the login route.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="flat" color="primary">
            Try to navigate to login route
          </Button>
        </Link>

        <br />
        <p>
          Learn how to get started using Frothy in your own app on{' '}
          <a
            href="https://github.com/gojutin/frothy#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            GitHub
          </a>.
        </p>
      </Container>
    );
  }
}

export default HomeScreen;
