import React, { Component } from 'react';
import { Input, Button, Divider } from '../common';

class PasswordResetForm extends Component {
  state = {
    email: '',
    emailIsValid: false,
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

  onChangeRemember = e => {
    this.setState(prevState => ({
      rememberMe: !prevState.rememberMe,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.emailIsValid) return;
    const { email } = this.state;

    this.props.handlePasswordReset(email);
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
        <br />
        <Button
          type="submit"
          disabled={!this.state.emailIsValid}
          loading={this.props.loading}
          themeColor={this.props.themeColor}
        >
          Email my password reset link
        </Button>
      </form>
    );
  }
}

export default PasswordResetForm;
