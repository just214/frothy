import React from 'react';
import styled from 'styled-components';
// 58
import CloseIcon from '../icons/close.svg';

const Container = styled.div`
  background-color: ${props => props.titleBackgroundColor};
  text-align: left;
  color: ${props => getColor(props.messageType)};
  padding: 10px;
  border-radius: ${props => props.rounded};
`;

const MessageBox = styled.div`
  background-color: #212121;
  padding: 10px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  min-height: 40px;
`;

const getColor = type => {
  switch (type) {
    case 'error':
      return '#EF5350';
    case 'success':
      return '#00C851';
    default:
      return '#eee';
  }
};

const Message = props => {
  return (
    <Container {...props}>
      <MessageBox>
        <small style={{ flex: 6 }}>{props.children}</small>
        <small
          onClick={props.dismiss}
          style={{
            color: '#eee',
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center',
          }}
        >
          <img height="20px" src={CloseIcon} alt="close message icon" />
        </small>
      </MessageBox>
    </Container>
  );
};

export default Message;
