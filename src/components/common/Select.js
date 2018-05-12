import styled from 'styled-components';

const Select = styled.select`
  width: 30%;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 1px;
  outline: none;
  padding: 0px 10px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 8px;
`;
const Option = styled.option`
  line-height: 30px;
  font-size: 14px;
  outline: none;
  padding: 0px 10px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 8px;
`;

export { Select, Option };
