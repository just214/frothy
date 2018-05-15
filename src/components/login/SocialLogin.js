import React from 'react';
import GoogleIcon from '../../icons/google.svg';
import FacebookIcon from '../../icons/facebook.svg';
import TwitterIcon from '../../icons/twitter.svg';
import GithubIcon from '../../icons/github.svg';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-size: cover;

  animation: ${props => (props.loading ? rotate360 : '')} 2s linear infinite;

  cursor: pointer;
  outline: none;
  margin: 0 auto;
  :hover {
    opacity: 0.9;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const SocialWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SocialLogin = props => {
  const handleSocialLogin = provider => {
    props.handleSocialLogin(provider);
  };

  const getProviders = () => {
    let arr = [];
    if (props.google)
      arr.push({ name: 'google', displayName: 'Google', icon: GoogleIcon });
    if (props.facebook)
      arr.push({
        name: 'facebook',
        displayName: 'Facebook',
        icon: FacebookIcon,
      });
    if (props.twitter)
      arr.push({ name: 'twitter', displayName: 'Twitter', icon: TwitterIcon });
    if (props.github)
      arr.push({ name: 'github', displayName: 'GitHub', icon: GithubIcon });
    return arr;
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <small style={{ color: '#424242' }}>Log In With:</small>

      <SocialContainer>
        {getProviders().map(provider => (
          <SocialWrapper key={provider.name}>
            <StyledButton
              themeColor={props.themeColor}
              onClick={() => handleSocialLogin(provider.name)}
              loading={props.provider === provider.name && props.loading}
            >
              <img
                src={provider.icon}
                alt={`${provider.name} social login button`}
                style={{
                  // paddingTop: '3px',
                  backgroundSize: 'cover',
                  width: '100%',
                }}
              />
            </StyledButton>
            {props.showLabels ? <small>{provider.displayName}</small> : null}
          </SocialWrapper>
        ))}
      </SocialContainer>
    </div>
  );
};

export default SocialLogin;
