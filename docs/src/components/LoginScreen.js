import React from 'react';
import withOptions from './options/withOptions';
import Frothy from 'frothy';
import Button from 'material-ui/Button';

import firebase from 'firebase/app';
import 'firebase/auth';

const LoginScreen = props => {
  return (
    <div style={{ paddingTop: '50px', marginBottom: '50px' }}>
      <h1 style={{ margin: 0, color: '#424242' }}>
        <code>npm i frothy</code>
      </h1>
      <Button
        color="primary"
        size="small"
        target="_blank"
        href="https://github.com/gojutin/frothy#readme"
        style={{ margin: '0px' }}
        variant="flat"
        rel="noopener noreferrer"
      >
        view on github
      </Button>
      <Frothy {...props} auth={firebase.auth} />
    </div>
  );
};

export default withOptions(LoginScreen);
