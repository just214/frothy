import React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../icons/check.svg';

const StyledRequirement = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
`;

const Icon = styled.div`
  height: 15px;
  width: 15px;
  border: 0.5px ${props => (props.valid ? 'solid' : 'dashed')} #ccc;
  border-radius: 2px;
`;

const Title = styled.p`
  color: ${props => (props.valid ? 'green' : '#424242')};
  font-size: 14px;
  margin: 5px;
`;

const SingleRequirement = props => {
  return (
    <React.Fragment>
      {props.show ? (
        <StyledRequirement>
          <Icon valid={props.valid}>
            {props.valid ? (
              <img src={CheckIcon} height={15} alt="Check Icon" />
            ) : null}
          </Icon>
          <Title valid={props.valid}>{props.title}</Title>
        </StyledRequirement>
      ) : null}
    </React.Fragment>
  );
};

export default SingleRequirement;
