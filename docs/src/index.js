import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyDxT66pMFKoylsGQDkSPP4sz1japsuEUcY',
  authDomain: 'frothy-123.firebaseapp.com',
  databaseURL: 'https://frothy-123.firebaseio.com',
  projectId: 'frothy-123',
  storageBucket: 'frothy-123.appspot.com',
  messagingSenderId: '997488597457',
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
