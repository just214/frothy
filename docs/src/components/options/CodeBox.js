import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/light';
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/styles/hljs/docco';

registerLanguage('javascript', js);

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
  passwordRules={{
    show: ${props.passwordRules.show},
    min: ${props.passwordRules.min},
    max: ${props.passwordRules.max},
    uppercase: ${props.passwordRules.uppercase},
    lowercase: ${props.passwordRules.lowercase},
    symbols: ${props.passwordRules.symbols},
    numbers: ${props.passwordRules.numbers},
  }}
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
