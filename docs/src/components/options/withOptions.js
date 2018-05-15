import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import StyleOptions from './StyleOptions';
import ColorOptions from './ColorOptions';
import Checkbox from 'material-ui/Checkbox';

import { Container } from '../common';
import CheckboxList from './CheckboxList';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Radio from 'material-ui/Radio';
import CodeBox from './CodeBox';
import PasswordOptions from './PasswordOptions';

const withOptions = FrothyComponent =>
  class Options extends Component {
    state = {
      // STYLE
      drawer: false,
      title: 'Welcome to Frothy!',
      modal: false,
      modalOverlay: true,
      rounded: 1,
      showBorder: true,
      shadow: 2,
      showLabels: false,
      // AUTH
      emailLogin: true,
      emailSignup: true,
      passwordRules: {
        show: true,
        min: 6,
        max: 50,
        uppercase: 0,
        lowercase: 0,
        symbols: 0,
        numbers: 0,
      },
      agree: false,
      emailRemember: true,
      passwordReset: true,
      phone: true,
      recaptcha: 'invisible',
      recaptchaBadge: 'inline',
      anonymous: true,
      google: true,
      facebook: true,
      github: true,
      twitter: true,
      pageColor: '#FFF',
      titleBackgroundColor: '#eee',
      titleColor: '#424242',
      themeColor: '#2196F3',
    };

    toggleDrawer = () => {
      this.setState(prevState => ({ drawer: !prevState.drawer }));
    };

    changeTitle = e => {
      this.setState({
        title: e.target.value,
      });
    };

    changeShadow = e => {
      this.setState({ shadow: e.target.value });
    };

    changeRounded = e => {
      this.setState({ rounded: e.target.value });
    };

    changeColor = (color, type) => {
      this.setState({
        [`${type}`]: color.hex,
      });
    };

    changePasswordRule = (type, value) => {
      this.setState(prevState => ({
        passwordRules: {
          ...prevState.passwordRules,
          [`${type}`]: value,
        },
      }));
    };

    handleCheckbox = name => {
      this.setState(prevState => ({
        [`${name}`]: !prevState[`${name}`],
      }));
    };

    handleShowPasswordRuleCheckbox = name => {
      this.setState(prevState => ({
        passwordRules: {
          ...prevState.passwordRules,
          show: !prevState.passwordRules.show,
        },
      }));
    };

    render() {
      return (
        <div>
          <Drawer
            open={this.state.drawer}
            onClose={this.toggleDrawer}
            anchor="left"
          >
            <div
              tabIndex={0}
              style={{ marginLeft: '10px', marginTop: '20px' }}
              role="button"
              aria-label="Drawer Toggle"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <Button color="primary" size="small" variant="flat">
                <Icon>menu</Icon>
              </Button>

              <h3 style={{ display: 'inline-block', paddingLeft: '20px' }}>
                {' '}
                PROPS
              </h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p>Scroll down to see the code</p>
            </div>

            <div
              style={{
                width: '285px',
                padding: '20px',
                paddingTop: '0px',
              }}
            >
              <h5>STYLE</h5>
              <ColorOptions
                changeColor={this.changeColor}
                themeColor={this.state.themeColor}
                pageColor={this.state.pageColor}
                titleBackgroundColor={this.state.titleBackgroundColor}
                titleColor={this.state.titleColor}
              />
              <StyleOptions
                title={this.state.title}
                changeTitle={this.changeTitle}
                shadow={this.state.shadow}
                changeShadow={this.changeShadow}
                rounded={this.state.rounded}
                changeRounded={this.changeRounded}
                handleCheckbox={this.handleCheckbox}
              />
              <CheckboxList
                {...this.state}
                handleCheckbox={this.handleCheckbox}
                items={['modal', 'modalOverlay', 'showBorder', 'showLabels']}
              />
              <h5>EMAIL/PASSWORD</h5>
              <CheckboxList
                {...this.state}
                handleCheckbox={this.handleCheckbox}
                items={[
                  'emailLogin',
                  'emailSignup',
                  'agree',
                  'emailRemember',
                  'passwordReset',
                ]}
              />
              <h5>PASSWORD RULES</h5>
              <Checkbox
                checked={this.state.passwordRules.show}
                onChange={this.handleShowPasswordRuleCheckbox}
              />show
              <br />
              <PasswordOptions
                passwordRules={this.state.passwordRules}
                changePasswordRule={this.changePasswordRule}
              />
              <h5>SOCIAL</h5>
              <CheckboxList
                {...this.state}
                handleCheckbox={this.handleCheckbox}
                items={['google', 'facebook', 'twitter', 'github']}
              />
              <h5>OTHER</h5>
              <CheckboxList
                {...this.state}
                handleCheckbox={this.handleCheckbox}
                items={['phone', 'anonymous']}
              />
              <div>
                <small>recaptcha</small>
              </div>
              <Radio
                checked={this.state.recaptcha === 'invisible'}
                onChange={() => this.setState({ recaptcha: 'invisible' })}
                value="a"
                name="recaptcha"
                aria-label="invisible"
              />{' '}
              invisible
              <Radio
                checked={this.state.recaptcha === 'normal'}
                onChange={() => this.setState({ recaptcha: 'normal' })}
                value="b"
                name="recaptcha"
                aria-label="normal"
              />normal
              <div>
                <small>recaptchaBadge</small>
              </div>
              {['inline', 'bottomright', 'bottomleft'].map(p => (
                <React.Fragment key={p}>
                  <Radio
                    key={p}
                    checked={this.state.recaptchaBadge === p}
                    onChange={() => this.setState({ recaptchaBadge: p })}
                    value={p}
                    name="recaptchaBadge"
                    aria-label="normal"
                    label={p}
                  />
                  {p}
                </React.Fragment>
              ))}
            </div>

            <CodeBox {...this.state} />
          </Drawer>
          <Container style={{ backgroundColor: this.state.pageColor }}>
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 5,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                color="primary"
                size="small"
                style={{ margin: '10px' }}
                variant="flat"
                onClick={this.toggleDrawer}
              >
                <Icon size="sm">menu</Icon>
              </Button>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#424242',
                  fontFamily: 'Indie Flower, cursive',
                }}
              >
                <Icon>arrow_back</Icon> <p>Start Here</p>
              </div>
            </div>

            <FrothyComponent {...this.state} />
          </Container>
        </div>
      );
    }
  };

export default withOptions;
