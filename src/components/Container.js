import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Tabs from './Tabs';
import { TabPanel } from 'react-tabs';
import LoginTab from './login/LoginTab';
import Message from './Message';
import SignupForm from './signup/SignupForm';
import Transition from 'react-transition-group/Transition';
import * as auth from '../firebase';

const StyledContainer = styled.div`
  width: 330px;
  font-family: 'Roboto', sans-serif;
  max-width: 98%;
  height: auto;
  padding: 0;
  overflow: auto;
  border: ${props =>
    props.showBorder && !props.shadow ? '.5px solid #9E9E9E' : 'none'};
  border-radius: ${props => getBorderRadius(props.rounded)}
  background-color: white;
  margin: 0 auto;
  padding-bottom: 15px;
  box-shadow: ${props => getShadow(props.shadow)};
`;

const getShadow = shadowProp => {
  switch (shadowProp) {
    case 1:
      return '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
    case 2:
      return '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
    case 3:
      return '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
    case 4:
      return '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
    case 5:
      return '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';
    default:
      return 'none';
  }
};

const getBorderRadius = shadowProp => {
  switch (shadowProp) {
    case 1:
      return '5px';
    case 2:
      return '10px';
    case 3:
      return '15px';
    case 4:
      return '20px';
    case 5:
      return '25px';
    default:
      return '0px';
  }
};

const duration = 700;

const defaultStyle = {
  transition: `opacity ${duration}ms `,
  opacity: 0,
  padding: 0,
  margin: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

class Container extends Component {
  state = {
    messageText: null,
    messageType: null,
    messageComplete: false,
    loading: false,
    provider: '',
    savedEmail: '',
    textSent: false,
    confirmationResult: null,
  };

  componentWillMount() {
    const savedEmail = localStorage.getItem('frothyEmailAddress');
    this.setState({ savedEmail });
  }

  cancelTextSent = () => {
    this.setState({
      textSent: false,
    });
  };

  handleStartAsync = provider => {
    this.setState({
      loading: true,
      provider,
      messageText: '',
      messageType: '',
    });
  };

  handleError = error => {
    console.error(error);
    const err = auth.firebaseError(error);
    this.updateMessage({
      messageText: err,
      messageType: 'error',
    });
    this.setState({
      loading: false,
    });
    return error;
  };

  handleEmailSignup = (email, password) => {
    if (!this.props.emailSignup) return;
    this.handleStartAsync('email');
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.handleError(error);
        window.recaptchaVerifierSignup.render().then(function(widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  };

  handleEmailLogin = (email, password, remember) => {
    if (!this.props.emailLogin) return;
    this.handleStartAsync('email');
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // Remember the email only if login is successful
        this.handleRememberEmail(email, remember);
        this.setState({ loading: false });
      })
      .catch(error => this.handleError(error));
  };

  handlePhoneLogin = phoneNumber => {
    if (!this.props.phone) return;
    this.handleStartAsync('phone');
    const appVerifier = window.recaptchaVerifier;
    return auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        this.setState({
          loading: false,
          textSent: true,
          confirmationResult,
        });
        this.updateMessage({
          messageText: `A confirmation code has been texted to ${phoneNumber}.`,
          messageType: 'success',
        });
      })
      .catch(error => {
        this.handleError(error);
        window.recaptchaVerifier.render().then(function(widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  };

  handleConfirmCode = code => {
    if (!this.props.phone) return;
    this.handleStartAsync('phone');
    this.state.confirmationResult
      .confirm(code)
      .then(user => {
        this.setState({ loading: false });
      })
      .catch(() => this.handleError(error));
  };

  handleAnonymousLogin = () => {
    if (!this.props.anonymous) return;
    this.handleStartAsync('anonymous');
    return auth
      .signInAnonymously()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => this.handleError(error));
  };

  handleSocialLogin = provider => {
    console.log('PRO', provider);
    if (!this.props[`${provider}`]) return;
    this.handleStartAsync(provider);
    auth
      .socialLogin(provider)
      .then(user => {
        this.setState({ loading: false });
        console.log(user);
      })
      .catch(error => this.handleError(error));
  };

  handlePasswordReset = email => {
    if (!this.props.passwordReset) return;
    this.handleStartAsync('password');
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ loading: false });
        this.updateMessage({
          messageText: `An email with a password reset link has been sent to ${email}.`,
          messageType: 'success',
        });
      })
      .catch(() => this.handleError(error));
  };

  handleRememberEmail = (email, remember) => {
    if (!this.props.emailRemember) return;
    if (remember) {
      localStorage.setItem('frothyEmailAddress', email);
    } else if (!remember) {
      localStorage.removeItem('frothyEmailAddress');
    }
  };

  dismissMessage = () => {
    this.setState({
      messageText: null,
      messageType: null,
    });
  };

  updateMessage = ({ messageText, messageType }) => {
    // The messageComplete state is due to the transistion not working when the component is conditionally
    // rendered with the same prop that is transitioning it.
    this.setState(
      {
        messageText,
        messageType,
        messageComplete: false,
      },
      () => {
        this.setState({
          messageComplete: true,
        });
      },
    );
  };

  render() {
    const loginEnabled =
      this.props.google ||
      this.props.facebook ||
      this.props.twitter ||
      this.props.github ||
      this.props.emailLogin ||
      this.props.emailRemember ||
      this.props.anonymous ||
      this.props.passwordReset ||
      this.props.phone;

    return (
      <StyledContainer
        shadow={this.props.shadow}
        showBorder={this.props.showBorder}
        rounded={this.props.rounded}
      >
        {this.state.messageText ? (
          <div style={{ backgroundColor: this.props.titleBackgroundColor }}>
            <Transition in={this.state.messageComplete} timeout={duration}>
              {state => (
                <Message
                  styles={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                  dismiss={this.dismissMessage}
                  messageType={this.state.messageType}
                  titleBackgroundColor={this.props.titleBackgroundColor}
                  rounded={this.props.rounded}
                >
                  {this.state.messageText}
                </Message>
              )}
            </Transition>
          </div>
        ) : (
          <Header
            titleColor={this.props.titleColor}
            title={this.props.title}
            titleBackgroundColor={this.props.titleBackgroundColor}
            rounded={this.props.rounded}
          />
        )}

        <Tabs
          themeColor={this.props.themeColor}
          backgroundColor={this.props.titleBackgroundColor}
          signupEnabled={this.props.emailSignup}
          loginEnabled={loginEnabled}
        >
          {loginEnabled ? (
            <TabPanel
              style={{
                padding: '10px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              <LoginTab
                {...this.props}
                handleEmailLogin={this.handleEmailLogin}
                handlePasswordReset={this.handlePasswordReset}
                handlePhoneLogin={this.handlePhoneLogin}
                handleConfirmCode={this.handleConfirmCode}
                handleAnonymousLogin={this.handleAnonymousLogin}
                handleSocialLogin={this.handleSocialLogin}
                google={this.props.google}
                facebook={this.props.facebook}
                twitter={this.props.twitter}
                github={this.props.github}
                loading={this.state.loading}
                provider={this.state.provider}
                emailRemember={this.props.emailRemember}
                emailLogin={this.props.emailLogin}
                savedEmail={this.state.savedEmail}
                textSent={this.state.textSent}
                cancelTextSent={this.cancelTextSent}
              />
            </TabPanel>
          ) : null}

          {this.props.emailSignup ? (
            <TabPanel
              // these styles are super sketchy. Not sure why this TabPanel is different from the one
              // above when the styles are exactly the same. They both render an unstyled div?!?!
              style={{
                padding: '0px',
                textAlign: 'center',
                margin: '10px',
              }}
            >
              <SignupForm
                loading={this.props.loading && this.props.provider === 'email'}
                handleEmailSignup={this.handleEmailSignup}
                savedEmail={this.state.savedEmail}
                themeColor={this.props.themeColor}
                recaptcha={this.props.recaptcha}
              />
            </TabPanel>
          ) : null}
        </Tabs>
      </StyledContainer>
    );
  }
}

export default Container;
