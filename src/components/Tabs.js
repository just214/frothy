import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, TabList, Tab } from 'react-tabs';
import Transition from 'react-transition-group/Transition';

// react-tabs does not play nice with styled-components. This file still needs to be refactored.

const TabBase = styled(Tab)`
  list-style-type: none;
  padding-bottom: 5px;
  cursor: pointer;
  outline: none;
  width: 30%;
  text-align: center;
  display: inline-block;
`;

const TabContent = styled.div`
  color: ${props => (props.isSelected ? props.themeColor : '#707070')};
  :hover {
    color: ${props => props.themeColor};
  }
`;

const StyledTab = props => (
  <TabBase>
    <TabContent {...props}>{props.children}</TabContent>
  </TabBase>
);

const duration = 100;

const defaultStyle = {
  transition: `padding-left ${duration}ms `,
  paddingLeft: 0,
};

const transitionStyles = {
  entering: { paddingLeft: 0 },
  entered: { paddingLeft: '39%' },
};

class TabsComponent extends Component {
  state = {
    tabIndex: 0,
  };

  render() {
    const { themeColor, isSelected, ...rest } = this.props;
    StyledTab.tabsRole = 'Tab'; // Required field to use your custom Tab

    return (
      <div>
        {/* This ugly inline style tag is the only way I have figured out how to remove 
      the flash of gray when switching tabs on the iPhone. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .react-tabs { 
              -webkit-tap-highlight-color:  transparent;
              }
            `,
          }}
        />
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
        >
          <TabList
            style={{
              backgroundColor: this.props.backgroundColor,
              width: '100%',
              padding: '0px',
              margin: '0px',
              textAlign: 'center',
            }}
          >
            {this.props.loginEnabled ? (
              <StyledTab
                themeColor={themeColor}
                isSelected={this.state.tabIndex === 0}
              >
                <small>
                  <b>LOG IN</b>
                </small>
              </StyledTab>
            ) : null}
            {this.props.signupEnabled ? (
              <StyledTab
                themeColor={themeColor}
                isSelected={this.state.tabIndex === 1}
              >
                <small>
                  <b>SIGN UP</b>
                </small>
              </StyledTab>
            ) : null}
          </TabList>

          {this.props.loginEnabled && this.props.signupEnabled ? (
            <Transition in={this.state.tabIndex === 1} timeout={duration}>
              {state => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                    backgroundColor: this.props.backgroundColor,
                  }}
                >
                  <div
                    style={{
                      height: 0,
                      border: `1px solid ${this.props.themeColor}`,
                      width: '80px',
                      marginLeft: '22%',
                      backgroundColor: this.props.backgroundColor,
                    }}
                  />
                </div>
              )}
            </Transition>
          ) : null}
          <hr style={{ margin: 0, border: '.5px solid #ccc' }} />

          {this.props.children}
        </Tabs>
      </div>
    );
  }
}

export default TabsComponent;
