import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  margin: 10px;
  zoom: 1.1;
  transform: scale(1.1);
`;

const Label = styled.label`
  color: #484848;
  font-size: 14px;
`;

const Checkbox = props => (
  <Container>
    <Label>
      <StyledCheckbox type="checkbox" {...props} />
      {props.label}
    </Label>
  </Container>
);

export { Checkbox };
