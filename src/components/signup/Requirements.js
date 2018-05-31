import React from 'react';
import styled from 'styled-components';
import SingleRequirement from './SingleRequirement';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  margin-left: 50px;
`;

const Requirements = props => {
  return (
    <div>
      <p
        style={{
          color: '#424242',
          margin: '3px',
          marginTop: '15px',
          fontSize: '14px',
        }}
      >
        PASSWORD REQUIREMENTS:
      </p>
      <Container>
        <SingleRequirement
          show={true}
          valid={props.passwordMinIsValid && props.passwordMaxIsValid}
          title={`Between ${props.passwordRules.min} and ${
            props.passwordRules.max
          } characters`}
        />

        <SingleRequirement
          show={props.passwordRules.uppercase}
          valid={props.passwordUppercaseIsValid}
          title={`At least ${props.passwordRules.uppercase} uppercase letters`}
        />

        <SingleRequirement
          show={props.passwordRules.lowercase !== 0}
          valid={props.passwordLowercaseIsValid}
          title={`At least ${props.passwordRules.lowercase} lowercase letters`}
        />

        <SingleRequirement
          show={props.passwordRules.symbols !== 0}
          valid={props.passwordSymbolsIsValid}
          title={`At least ${props.passwordRules.symbols} symbols`}
        />

        <SingleRequirement
          show={props.passwordRules.numbers !== 0}
          valid={props.passwordNumbersIsValid}
          title={`At least ${props.passwordRules.numbers} numbers`}
        />
      </Container>
    </div>
  );
};

export default Requirements;
