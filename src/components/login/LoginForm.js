import React, { Component } from 'react';
import { Input, Button, Checkbox, Divider } from '../common';

class LoginForm extends Component {
  state = {
    email: '',
    emailIsValid: false,
    password: '',
    passwordIsValid: false,
    rememberMe: true,
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

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
      emailIsValid: this.validateEmail(e.target.value),
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
      passwordIsValid: !!e.target.value.length,
    });
  };

  onChangeRemember = e => {
    this.setState(prevState => ({
      rememberMe: !prevState.rememberMe,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.emailIsValid || !this.state.passwordIsValid) return;
    const { email, password, rememberMe } = this.state;

    return this.props
      .handleEmailLogin(email, password, rememberMe)
      .catch(err => {
        console.error('ERROR!');
        this.setState({
          password: '',
          passwordIsValid: false,
        });
      });
  };

  render() {
    return (
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
          id="login-email"
          type="password"
          value={this.state.password}
          onChange={this.onChangePassword}
          isValid={this.state.passwordIsValid}
          icon="password"
          placeholder="Password"
        />
        {this.props.emailRemember ? (
          <Checkbox
            label="Remember me"
            checked={this.state.rememberMe}
            onChange={this.onChangeRemember}
          />
        ) : null}

        <Button
          disabled={!this.state.emailIsValid || !this.state.passwordIsValid}
          loading={this.props.isLoading}
          themeColor={this.props.themeColor}
        >
          Login with email
        </Button>
      </form>
    );
  }
}

export default LoginForm;
