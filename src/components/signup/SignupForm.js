import React, { Component } from 'react';
import { Input, Button, Checkbox } from '../common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {
    email: '',
    emailIsValid: false,
    password: '',
    passwordIsValid: false,
    confirmPassword: '',
    confirmPasswordIsValid: false,
    rememberMe: true,
    notARobot: false,
  };

  componentDidMount() {
    const email = this.props.savedEmail;
    if (email) {
      this.setState({
        email,
        emailIsValid: this.validateEmail(email),
      });
    }

    window.recaptchaVerifierSignup = new firebase.auth.RecaptchaVerifier(
      this.recaptcha,
      {
        size: this.props.recaptcha === 'invisible' ? 'invisible' : 'normal',
        // size: 'normal',
        callback: response => {
          this.setState({
            notARobot: true,
          });
        },
        'expired-callback': function() {
          window.recaptchaVerifierSignup.render().then(function(widgetId) {
            grecaptcha.reset(widgetId);
          });
        },
      },
    );
    window.recaptchaVerifierSignup.render().then(function(widgetId) {
      window.recaptchaWidgetSignupId = widgetId;
    });
  }

  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validatePassword = password => {
    return password.length >= 6;
  };

  validateConfirmPassword = (pw1, pw2) => pw1 === pw2 && pw2.length >= 6;

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
      emailIsValid: this.validateEmail(e.target.value),
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
      passwordIsValid: this.validatePassword(e.target.value),
      confirmPasswordIsValid: this.validateConfirmPassword(
        e.target.value,
        this.state.confirmPassword,
      ),
    });
  };

  onChangeConfirmPassword = e => {
    this.setState({
      confirmPassword: e.target.value,
      confirmPasswordIsValid: this.validateConfirmPassword(
        e.target.value,
        this.state.password,
      ),
    });
  };

  isValid = () =>
    this.state.emailIsValid &&
    this.state.passwordIsValid &&
    this.state.confirmPasswordIsValid;

  handleSubmit = e => {
    e.preventDefault();

    console.log(window.recaptchaVerifierSignup);
    console.log(window.recaptchaWidgetSignupId);
    if (!this.isValid()) return;
    const { email, password } = this.state;
    this.props.handleEmailSignup(email, password);
  };

  render() {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={this.state.email}
            onChange={this.onChangeEmail}
            isValid={this.state.emailIsValid}
            icon="email"
            placeholder="Email"
          />
          <Input
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            isValid={this.state.passwordIsValid}
            icon="password"
            placeholder="Password"
          />
          <Input
            type="password"
            value={this.state.confirmPassword}
            onChange={this.onChangeConfirmPassword}
            isValid={this.state.confirmPasswordIsValid}
            icon="password"
            placeholder="Confirm your password"
          />

          <div ref={ref => (this.recaptcha = ref)} />

          <Button
            style={{ marginTop: '10px' }}
            disabled={
              !this.state.emailIsValid ||
              !this.state.passwordIsValid ||
              !this.state.notARobot
            }
            loading={this.props.loading}
            themeColor={this.props.themeColor}
          >
            SIGN UP!
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
