import React from 'react';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const StyleOptions = props => (
  <React.Fragment>
    <TextField
      style={{ width: '100%', margin: '20px 0' }}
      label="title"
      onChange={props.changeTitle}
      value={props.title}
    />

    <small>shadow</small>

    <Select
      value={props.shadow}
      onChange={props.changeShadow}
      style={{ width: '30%', textAlign: 'center' }}
      label="shadow"
    >
      {[0, 1, 2, 3, 4, 5].map(num => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </Select>

    <small>rounded</small>

    <Select
      value={props.rounded}
      onChange={props.changeRounded}
      style={{ width: '30%', textAlign: 'center' }}
      label="rounded"
    >
      {[0, 1, 2, 3, 4, 5].map(num => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </Select>
  </React.Fragment>
);

export default StyleOptions;
