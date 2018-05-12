import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const CodeBox = props => (
  <div style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}>
    <SyntaxHighlighter language="javascript" style={docco}>{`
<Frothy
  modal={${props.modal}}
  themeColor='${props.themeColor}'
  showBorder={${props.showBorder}}
  rounded={${props.rounded}}
  shadow={${props.shadow}}
  showLabels={${props.showLabels}}
  title='${props.title}'
  titleColor='${props.titleColor}'
  titleBackgroundColor='${props.titleBackgroundColor}'
  emailLogin={${props.emailLogin}}
  emailRemember={${props.emailRemember}}
  emailSignup={${props.emailSignup}}
  passwordReset={${props.passwordReset}}
  phone={${props.phone}}
  recaptcha='${props.recaptcha}'
  anonymous={${props.anonymous}}
  google={${props.google}}
  facebook={${props.facebook}}
  twitter={${props.twitter}}
  github={${props.github}}
/>
`}</SyntaxHighlighter>
  </div>
);

export default CodeBox;
