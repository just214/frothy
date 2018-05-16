import React from 'react';
import styled from 'styled-components';

import emailIcon from '../../icons/email.svg';
import emailSuccessIcon from '../../icons/email_success.svg';
import lockIcon from '../../icons/lock.svg';
import lockSuccessIcon from '../../icons/lock_success.svg';
import phoneIcon from '../../icons/phone.svg';
import phoneSuccessIcon from '../../icons/phone_success.svg';

const getIcon = (icon, isValid) => {
  if (icon === 'email' && !isValid) {
    return emailIcon;
  } else if (icon === 'email' && isValid) {
    return emailSuccessIcon;
  } else if (icon === 'password' && !isValid) {
    return lockIcon;
  } else if (icon === 'password' && isValid) {
    return lockSuccessIcon;
  } else if (icon === 'phone' && !isValid) {
    return phoneIcon;
  } else if (icon === 'phone' && isValid) {
    return phoneSuccessIcon;
  } else if (icon === 'phone' && !isValid) {
    return phoneIcon;
  }
};

const StyledInput = styled.input`
  background-image: url(${props => getIcon(props.icon, props.isValid)});
  background-repeat: no-repeat;
  background-position: 8px 8px;
  text-indent: ${props => (props.icon ? '30px' : '0px')};
  width: ${props => props.width || '90%'};
  height: 35px;
  line-height: 25px;
  font-size: 16px;
  box-shadow: none;
  border: none;
  outline: none;
  padding: 0px 10px;
  font-family: 'Roboto', sans-serif;
  margin: 5px;
`;

const Input = props => {
  const { autocomplete, ...rest } = props;
  return <StyledInput {...rest} aria-label={props.placeholder} />;
};

export { Input };
