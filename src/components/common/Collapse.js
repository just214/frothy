import React, { Component } from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const PanelContainer = styled.div`
  background-color: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PanelContent = styled.p`
  color: ${props => (props.isOpen ? '#82b1ff' : props.themeColor)};
  margin: 3px;
  font-size: 14px;
`;

const duration = 100;

const CollapseContainer = styled.div`
  transition: max-height ${() => duration}ms ease-out;
  padding: 0;
  margin: 0;
  overflow: hidden;
  max-height: 0;
`;

const CollapseContent = styled.div`
  padding: 10px 0px;
`;

const transitionStyles = {
  entering: { maxHeight: 0 },
  entered: { maxHeight: 300 },
};

class Collapse extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div>
        <PanelContainer>
          <PanelContent
            isOpen={this.state.isOpen}
            themeColor={this.props.themeColor}
            onClick={this.toggle}
          >
            {this.props.title}
          </PanelContent>
        </PanelContainer>
        <Transition in={this.state.isOpen} timeout={duration}>
          {state => (
            <CollapseContainer
              style={{
                ...transitionStyles[state],
              }}
            >
              <CollapseContent>{this.props.children}</CollapseContent>
            </CollapseContainer>
          )}
        </Transition>
      </div>
    );
  }
}

export { Collapse };
