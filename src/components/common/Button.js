import React from 'react';
import SpinnerIcon from '../../icons/spinner.svg';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: ${props => (props.width ? props.width : '90%')};
  border: none;
  height: 40px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 14px;
  padding: 5px;
  font-family: 'Roboto', sans-serif;
  outline: none;
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
  color: ${props => (props.disabled ? '#eee' : 'white')};
  opacity: ${props => (props.disabled ? 0.8 : 1)};
  background-color: ${props => props.themeColor};
  :hover {
    opacity: 0.8;
  }
`;

export const Button = props => {
  return (
    <div>
      <StyledButton {...props} onClick={props.onClick}>
        {props.loading ? (
          <img src={SpinnerIcon} alt="spinner" />
        ) : typeof props.children === 'string' ? (
          props.children.toUpperCase()
        ) : (
          props.children
        )}
      </StyledButton>
    </div>
  );
};
