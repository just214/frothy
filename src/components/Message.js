import React from 'react';
import styled from 'styled-components';
// 58
import CloseIcon from '../icons/close.svg';

const Container = styled.div`
  background-color: ${props => props.titleBackgroundColor};
  text-align: left;
  color: ${props => getMessageTextColor(props.messageType)};
  padding: 10px;
`;

const MessageBox = styled.div`
  background-color: #212121;
  padding: 10px;
  display: flex;
  align-items: center;
  min-height: 40px;
`;

const MessageText = styled.small`
  flex: 6;
`;

const MessageIcon = styled.small`
  color: #eee;
  cursor: pointer;
  flex: 1;
  text-align: center;
`;

const getMessageTextColor = type => {
  switch (type) {
    case 'error':
      return '#EF5350';
    case 'success':
      return 'green';
    default:
      return '#eee';
  }
};

const Message = props => {
  return (
    <Container {...props}>
      <MessageBox>
        <MessageText>{props.children}</MessageText>
        <MessageIcon onClick={props.dismiss}>
          <img height="20px" src={CloseIcon} alt="close message icon" />
        </MessageIcon>
      </MessageBox>
    </Container>
  );
};

export default Message;
