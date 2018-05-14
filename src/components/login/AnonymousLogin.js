import React from 'react';
import styled from 'styled-components';
import { Button } from '../common';
import UserIcon from '../../icons/user.svg';

const Container = styled.div`
  cursor: pointer;
  margin-top: 5px;
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
        loading={props.loading}
      >
        <ButtonContents>
          <img src={UserIcon} alt="Anonymous Login Button" />
          <span>&nbsp;LOG IN ANONYMOUSLY</span>
        </ButtonContents>
      </Button>
    </Container>
  );
};

export default AnonymousLogin;
