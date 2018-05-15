import React from 'react';
import TextField from 'material-ui/TextField';

const Input = props => (
  <TextField
    style={{ width: '30%', margin: '2px' }}
    label={props.type}
    onChange={e => props.changePasswordRule(props.type, e.target.value)}
    value={props.passwordRules[props.type]}
  />
);

const PasswordRules = props => {
  const types = ['min', 'max', 'uppercase', 'lowercase', 'symbols', 'numbers'];
  return (
    <div>{types.map(type => <Input {...props} key={type} type={type} />)}</div>
  );
};

export default PasswordRules;
