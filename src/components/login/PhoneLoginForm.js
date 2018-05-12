import React, { Component } from 'react';
import { Input, Button, Select, Option } from '../common';
import firebase from 'firebase';
import countrycodes from '../../utils/countrycodes';

class PasswordResetForm extends Component {
  state = {
    phoneNumber: '',
    phoneNumberIsValid: false,
    code: '',
    codeIsValid: false,
    countryCode: '',
    notARobot: false,
  };

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
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
          window.recaptchaVerifier.render().then(function(widgetId) {
            grecaptcha.reset(widgetId);
          });
        },
      },
    );
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }

  getCountryCallingCode = cc => {
    return countrycodes.filter(c => c.code === cc)[0]['callingCode'];
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.phoneNumberIsValid || !this.state.notARobot) return;
    const { countryCode, phoneNumber } = this.state;

    this.props.handlePhoneLogin(
      '+' + this.getCountryCallingCode(countryCode) + phoneNumber,
    );
  };

  handleConfirm = e => {
    e.preventDefault();
    this.props.handleConfirmCode(this.state.code);
  };

  validatePhoneNumber = phone => {
    return phone.length > 9;
  };

  validateCode = code => {
    return code.length === 6;
  };

  onChangePhoneNumber = e => {
    this.setState({
      phoneNumber: e.target.value,
      phoneNumberIsValid: this.validatePhoneNumber(e.target.value),
    });
  };

  onChangeCode = e => {
    this.setState({
      code: e.target.value,
      codeIsValid: this.validateCode(e.target.value),
    });
  };

  onChangeCountryCode = e => {
    this.setState({
      countryCode: e.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.textSent ? (
          <form onSubmit={this.handleConfirm}>
            <Input
              type="text"
              value={this.state.code}
              onChange={this.onChangeCode}
              isValid={this.state.codeIsValid}
              placeholder="Enter your code"
            />
            <Button
              type="submit"
              disabled={!this.state.codeIsValid}
              loading={this.props.isLoading}
              themeColor={this.props.themeColor}
            >
              Log In
            </Button>
            <small
              style={{ cursor: 'pointer', color: '#82b1ff' }}
              onClick={this.props.cancelTextSent}
            >
              start over
            </small>
          </form>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div
              ref={ref => (this.recaptcha = ref)}
              style={{
                transform: 'scale(0.95)',
                transformOrigin: 0,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={this.state.countryCode}
                onChange={this.onChangeCountryCode}
              >
                {countrycodes.map(cc => (
                  <Option key={cc.name + cc.callingCode} value={cc.code}>
                    {cc.code}
                  </Option>
                ))}
              </Select>

              <Input
                type="text"
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
                isValid={this.state.phoneNumberIsValid}
                icon="phone"
                placeholder="Phone Number"
              />
            </div>
            <Button
              type="submit"
              disabled={!this.state.phoneNumberIsValid || !this.state.notARobot}
              loading={this.props.isLoading}
              themeColor={this.props.themeColor}
            >
              Text Confirmation Code
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default PasswordResetForm;
