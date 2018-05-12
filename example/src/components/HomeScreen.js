import React from 'react';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 50px 15%;
  min-height: 100vh;
  background: #eee;
`;

const HomeScreen = props => {
  const logout = () => firebase.auth().signOut();
  return (
    <Container>
      <h2>And that's how easy it is to get started with Frothy!</h2>
      <h4>
        Well, there's a little Firebase configuration that you will also need to
        do but it's a painless process.
      </h4>

      <h4>
        This demo is using the Firebase <code>onAuthStateChanged</code> listener
        along with React-Router to control route navigation based on the
        authentication state.
      </h4>
      <h4>
        If you try to navigate back to the login screen, you should be
        redirected back to this /home route.
      </h4>
      <h4>
        Conversely, if you try to navigate to this /home route while not logged
        in, you should be redirected back to the login route.
      </h4>

      <Link to="/">
        <Button variant="flat" color="primary">
          Try to navigate to login route
        </Button>
      </Link>
      <br />
      <br />
      <h3>
        Learn how to get started using Frothy in your own app on{' '}
        <a
          href="https://github.com/gojutin/frothy#readme"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          GitHub
        </a>.
      </h3>
      <br />
      <Button variant="raised" color="secondary" onClick={logout}>
        LOGOUT
      </Button>
    </Container>
  );
};

export default HomeScreen;
