import React, { Component } from 'react';
import { Input, Button, Select, Option, Divider } from '../common';
import countrycodes from '../../utils/countrycodes';

class PasswordResetForm extends Component {
  state = {
    phoneNumber: '',
    phoneNumberIsValid: false,
    code: '',
    codeIsValid: false,
    countryCode: 'US',
  };

  componentDidMount() {
    window.recaptchaVerifier = new this.props.authMethod.RecaptchaVerifier(
      this.recaptcha,
      {
        size: this.props.recaptcha === 'invisible' ? 'invisible' : 'normal',
        callback: response => {},
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
    if (!this.state.phoneNumberIsValid) return;
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
            <Divider />
            <br />
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
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Select
                value={this.state.countryCode}
                onChange={this.onChangeCountryCode}
                aria-label="Country"
              >
                {countrycodes.map(cc => (
                  <Option key={cc.name + cc.callingCode} value={cc.code}>
                    {cc.name} +{cc.callingCode}
                  </Option>
                ))}
              </Select>
              <Divider />

              <Input
                type="text"
                width="85%"
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
                isValid={this.state.phoneNumberIsValid}
                icon="phone"
                placeholder="Phone Number"
              />
              <Divider />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '10px 0px',
              }}
            >
              <div
                ref={ref => (this.recaptcha = ref)}
                data-badge={this.props.recaptchaBadge}
              />
            </div>
            <Button
              type="submit"
              disabled={!this.state.phoneNumberIsValid}
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
