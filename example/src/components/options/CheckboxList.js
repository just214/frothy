import React from 'react';

import Checkbox from 'material-ui/Checkbox';

const CheckBoxList = props => (
  <React.Fragment>
    {props.items.map(value => (
      <div key={value} style={{ padding: 0 }}>
        <Checkbox
          checked={!!props[value]}
          onChange={() => props.handleCheckbox(value)}
        />{' '}
        {value}
      </div>
    ))}
  </React.Fragment>
);

export default CheckBoxList;
