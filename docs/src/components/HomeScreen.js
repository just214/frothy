import React from 'react';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import 'firebase/auth';

const Container = styled.div`
  padding: 50px 15% 0px 15%;
  background: #fff;
  color: #424242;
  height: 100vh;
  margin-bottom: 50px;
`;

const HomeScreen = props => {
  const logout = () => firebase.auth().signOut();
  return (
    <Container>
      <Button variant="raised" color="secondary" onClick={logout}>
        LOGOUT
      </Button>
      <h2>And that's how easy it is to get started with Frothy!</h2>
      <p>
        Well, there's a little Firebase configuration, but it's a painless
        process.
      </p>

      <h2>About this demo</h2>

      <p>
        This demo is using the Firebase <code>onAuthStateChanged</code> listener
        along with React-Router to control route navigation based on the
        authentication state.
      </p>
      <p>
        If you try to navigate back to the login screen, you should be
        redirected back to this /home route. Conversely, if you try to navigate
        to this /home route while not logged in, you should be redirected back
        to the login route.
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
};

export default HomeScreen;
