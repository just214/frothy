import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Collapse, Button } from '../common';
import PasswordResetForm from './PasswordResetForm';
import PhoneLoginForm from './PhoneLoginForm';
import AnonymousLogin from './AnonymousLogin';
import SocialLogin from './SocialLogin';

class LoginTab extends Component {
  render() {
    const socialEnabled =
      this.props.google ||
      this.props.facebook ||
      this.props.twitter ||
      this.props.github;
    return (
      <div style={{ paddingTop: '25px' }}>
        {this.props.emailLogin ? (
          <LoginForm
            isLoading={this.props.loading && this.props.provider === 'email'}
            {...this.props}
          />
        ) : null}

        {this.props.anonymous ? (
          <AnonymousLogin
            loading={this.props.loading && this.props.provider === 'anonymous'}
            handleAnonymousLogin={this.props.handleAnonymousLogin}
          />
        ) : null}

        {this.props.passwordReset ? (
          <Collapse
            title="Reset your password"
            themeColor={this.props.themeColor}
          >
            <div>
              <PasswordResetForm
                loading={
                  this.props.loading && this.props.provider === 'password'
                }
                themeColor={this.props.themeColor}
                handlePasswordReset={this.props.handlePasswordReset}
                savedEmail={this.props.savedEmail}
              />
            </div>
          </Collapse>
        ) : null}

        {this.props.phone ? (
          <Collapse
            title="Log in with your phone"
            themeColor={this.props.themeColor}
          >
            <div>
              <PhoneLoginForm
                isLoading={
                  this.props.loading && this.props.provider === 'phone'
                }
                handlePhoneLogin={this.props.handlePhoneLogin}
                handleConfirmCode={this.props.handleConfirmCode}
                textSent={this.props.textSent}
                cancelTextSent={this.props.cancelTextSent}
                recaptcha={this.props.recaptcha}
                recaptchaBadge={this.props.recaptchaBadge}
                themeColor={this.props.themeColor}
                auth={this.props.auth}
                authMethod={this.props.authMethod}
              />
            </div>
          </Collapse>
        ) : null}

        {socialEnabled ? (
          <SocialLogin
            handleSocialLogin={this.props.handleSocialLogin}
            loading={this.props.loading}
            themeColor={this.props.themeColor}
            provider={this.props.provider}
            google={this.props.google}
            facebook={this.props.facebook}
            twitter={this.props.twitter}
            github={this.props.github}
            showLabels={this.props.showLabels}
          />
        ) : null}
      </div>
    );
  }
}

export default LoginTab;
