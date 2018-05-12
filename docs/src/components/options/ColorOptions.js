import React from 'react';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import { CompactPicker } from 'react-color';

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: 'panel1',
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { changeColor } = this.props;
    const { expanded } = this.state;

    const options = [
      'pageColor',
      'themeColor',
      'titleColor',
      'titleBackgroundColor',
    ];

    return (
      <div>
        {options.map((option, i) => (
          <ExpansionPanel
            key={option}
            expanded={expanded === `panel${i + 1}`}
            onChange={this.handleChange(`panel${i + 1}`)}
          >
            <ExpansionPanelSummary>
              <small>
                {option === 'pageColor' ? 'Page Color (not a prop)' : option}
              </small>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CompactPicker
                color={this.props[option]}
                onChangeComplete={value => changeColor(value, option)}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default ControlledExpansionPanels;
