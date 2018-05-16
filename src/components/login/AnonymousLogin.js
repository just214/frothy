import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '../common';
import UserIcon from '../../icons/user.svg';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.img`
  animation: ${props => (props.loading ? rotate360 : '')} 2s linear infinite;
`;

const Container = styled.div`
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const ButtonContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnonymousLogin = props => {
  return (
    <Container>
      <Button
        style={{ color: '#424242' }}
        type="submit"
        themeColor={'#eee'}
        onClick={props.handleAnonymousLogin}
      >
        <ButtonContents>
          <Icon
            loading={props.loading}
            src={UserIcon}
            alt="Anonymous Login Button"
          />
          <span>&nbsp;LOG IN ANONYMOUSLY</span>
        </ButtonContents>
      </Button>
    </Container>
  );
};

export default AnonymousLogin;
