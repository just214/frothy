import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  text-align: center;
  padding: 10px;
  color: ${props => props.titleColor};
  background-color: ${props => props.titleBackgroundColor};
`;

const Header = ({ title: Title, ...rest }) => (
  <StyledHeader {...rest}>
    {typeof Title === 'string' ? <h3>{Title}</h3> : Title}
  </StyledHeader>
);

export default Header;
