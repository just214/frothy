import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Collapse, Button } from '../common';
import PasswordResetForm from './PasswordResetForm';
import PhoneLoginForm from './PhoneLoginForm';
import SocialLogin from './SocialLogin';
import UserIcon from '../../icons/user.svg';

class LoginTab extends Component {
  render() {
    const socialEnabled =
      this.props.google ||
      this.props.facebook ||
      this.props.twitter ||
      this.props.github;
    return (
      <div>
        {this.props.emailLogin ? (
          <LoginForm
            isLoading={this.props.loading && this.props.provider === 'email'}
            {...this.props}
          />
        ) : null}

        {this.props.anonymous ? (
          <div
            style={{
              cursor: 'pointer',
              marginTop: '5px',
              marginBottom: '10px',
              opacity: 0.8,
            }}
          >
            <Button
              type="submit"
              themeColor={'#424242'}
              onClick={this.props.handleAnonymousLogin}
              loading={
                this.props.loading && this.props.provider === 'anonymous'
              }
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={UserIcon} alt="Anonymous Login Button" />

                <span>LOG IN ANONYMOUSLY</span>
              </div>
            </Button>
          </div>
        ) : null}
        {this.props.passwordReset ? (
          <Collapse
            title="Reset your password"
            themeColor={this.props.themeColor}
          >
            <div>
              <PasswordResetForm
                isLoading={
                  this.props.loading && this.props.provider === 'password'
                }
                {...this.props}
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
                {...this.props}
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
