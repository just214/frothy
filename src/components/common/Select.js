import styled from 'styled-components';

const Select = styled.select`
  width: ${props => props.width || '90%'};
  height: 37px;
  line-height: 18px;
  font-size: 16px;
  border: none;
  /* border: 1px solid lightgray;
  border-radius: 1px; */
  outline: none;
  padding: 0px 10px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 8px;
  background-color: white;
`;
const Option = styled.option`
  line-height: 30px;
  font-size: 14px;
  outline: none;
  padding: 0px 10px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 8px;
  background-color: white;
`;

export { Select, Option };
