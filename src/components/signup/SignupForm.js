import React, { Component } from 'react';
import { Input, Button, Checkbox, Divider } from '../common';

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
        </form>
      </div>
    );
  }
}

export default LoginForm;
