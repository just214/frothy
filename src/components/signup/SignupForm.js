import React, { Component } from 'react';
import { Input, Button, Checkbox, Divider } from '../common';
import Requirements from './Requirements';

class LoginForm extends Component {
  state = {
    email: '',
    emailIsValid: false,
    password: '',
    passwordIsValid: false,
    confirmPassword: '',
    confirmPasswordIsValid: false,
    rememberMe: true,
    agreeToTerms: false,
    passwordIsValid: false,
    passwordMinIsValid: false,
    passwordMaxIsValid: false,
    passwordSymbolsIsValid: false,
    passwordNumbersIsValid: false,
    passwordUppercaseIsValid: false,
    passwordLowercaseIsValid: false,
  };

  componentDidMount() {
    const email = this.props.savedEmail;
    if (email) {
      this.setState({
        email,
        emailIsValid: this.validateEmail(email),
      });
    }
  }

  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validatePasswordMin = password =>
    password.length >= this.props.passwordRules.min;

  validatePasswordMax = password =>
    password.length <= this.props.passwordRules.max;

  validatePasswordSymbols = password => {
    if (this.props.passwordRules.symbols == 0) return true;
    // The double \\ is due to prettier removing a single \
    const check = '[!@#$%^&*\\-_+=<>\\(\\)\\[\\]\\(\\)?/:;~|"\']';
    // check the regex against the number of symbols required per the props.
    const pattern = new RegExp(check + `{${this.props.passwordRules.symbols}}`);
    //
    return pattern.test(String(password));
  };

  validatePasswordUppercase = password => {
    if (this.props.passwordRules.uppercase == 0) return true;
    const check = `[A-Z]`;
    // check the regex against the number of symbols required per the props.
    const pattern = new RegExp(
      check + `{${this.props.passwordRules.uppercase}}`,
    );
    return pattern.test(String(password));
  };

  validatePasswordLowercase = password => {
    if (this.props.passwordRules.lowercase == 0) return true;
    const check = `[a-z]`;
    // check the regex against the number of symbols required per the props.
    const pattern = new RegExp(
      check + `{${this.props.passwordRules.lowercase}}`,
    );
    return pattern.test(String(password));
  };

  validatePasswordNumbers = password => {
    if (this.props.passwordRules.numbers == 0) return true;
    const check = `[0-9]`;
    const pattern = new RegExp(check + `{${this.props.passwordRules.numbers}}`);
    return pattern.test(password);
  };

  validatePassword = password => {
    const min = this.validatePasswordMin(password);
    const max = this.validatePasswordMax(password);
    const uppercase = this.validatePasswordUppercase(password);
    const lowercase = this.validatePasswordLowercase(password);
    const symbols = this.validatePasswordSymbols(password);
    const numbers = this.validatePasswordNumbers(password);

    this.setState({
      passwordMinIsValid: min,
      passwordMaxIsValid: max,
      passwordUppercaseIsValid: uppercase,
      passwordLowercaseIsValid: lowercase,
      passwordSymbolsIsValid: symbols,
      passwordNumbersIsValid: numbers,
      passwordIsValid:
        min && max && symbols && uppercase && lowercase && numbers,
    });
  };

  validateConfirmPassword = (pw1, pw2) =>
    pw1 === pw2 && this.state.passwordIsValid;

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
      emailIsValid: this.validateEmail(e.target.value),
    });
  };

  onChangePassword = e => {
    this.validatePassword(e.target.value);
    this.setState({
      password: e.target.value,
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

  onChangeAgreeToTerms = e => {
    this.setState(prevState => ({
      agreeToTerms: !prevState.agreeToTerms,
    }));
  };

  isValid = () => {
    const initialValidation =
      this.state.emailIsValid &&
      this.state.passwordIsValid &&
      this.state.confirmPasswordIsValid;
    if (this.props.agree) {
      return initialValidation && this.state.agreeToTerms;
    } else {
      return initialValidation;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isValid()) return;
    if (this.props.agree && !this.state.agreeToTerms) return;
    const { email, password } = this.state;
    this.props.handleEmailSignup(email, password);
  };

  render() {
    return (
      <div style={{ paddingTop: '25px' }}>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={this.state.email}
            onChange={this.onChangeEmail}
            isValid={this.state.emailIsValid}
            icon="email"
            placeholder="Email"
          />
          <Divider />
          <Input
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            isValid={this.state.passwordIsValid}
            icon="password"
            placeholder="Password"
          />
          <Divider />
          <Input
            type="password"
            value={this.state.confirmPassword}
            onChange={this.onChangeConfirmPassword}
            isValid={this.state.confirmPasswordIsValid}
            icon="password"
            placeholder="Confirm your password"
          />

          {this.props.agree ? (
            <Checkbox
              label={this.props.agreeMessage}
              checked={this.state.agreeToTerms}
              onChange={this.onChangeAgreeToTerms}
            />
          ) : null}

          <Button
            style={{ marginTop: '10px' }}
            disabled={!this.isValid()}
            loading={this.props.loading}
            themeColor={this.props.themeColor}
          >
            SIGN UP
          </Button>
          {this.props.passwordRules.show ? (
            <Requirements
              {...this.state}
              passwordRules={this.props.passwordRules}
            />
          ) : null}
        </form>
      </div>
    );
  }
}

export default LoginForm;
