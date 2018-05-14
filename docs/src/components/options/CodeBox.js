import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const Container = styled.div`
  text-align: left;
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
`;

const CodeBox = props => {
  return (
    <Container>
      <SyntaxHighlighter language="javascript" style={docco}>{`
// This code snippet contains the
// default props, which do not
// need to be explicitly defined.

import Frothy from 'frothy';

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
  agree={${props.agree}}
  passwordReset={${props.passwordReset}}
  phone={${props.phone}}
  recaptcha='${props.recaptcha}'
  recaptchaBadge='${props.recaptchaBadge}'
  anonymous={${props.anonymous}}
  google={${props.google}}
  facebook={${props.facebook}}
  twitter={${props.twitter}}
  github={${props.github}}
/>
`}</SyntaxHighlighter>
    </Container>
  );
};

export default CodeBox;
