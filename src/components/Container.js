import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Tabs from './Tabs';
import { TabPanel } from 'react-tabs';
import LoginTab from './login/LoginTab';
import Message from './Message';
import SignupForm from './signup/SignupForm';
import withModal from './Modal';
import Transition from 'react-transition-group/Transition';

const StyledContainer = styled.div`
  text-align: center;
  width: 340px;
  min-height: 525px;
  font-family: 'Roboto', sans-serif;
  max-width: 100%;
  height: auto;
  padding: 0;
  overflow: auto;
  border: ${props =>
    props.showBorder && !props.shadow ? '.5px solid #9E9E9E' : 'none'};
  border-radius: ${props => getBorderRadius(props.rounded)}
  background-color: white;
  margin: 0 auto;
  padding-bottom: 10px;
  box-shadow: ${props => getShadow(props.shadow)};
`;

const firebaseError = error => {
  switch (error.code) {
    case 'auth/operation-not-allowed':
      return 'This feature is not enabled at this time.';
    case 'auth/account-exists-with-different-credential':
      return 'This email address is registered under a different account.';
    default:
      return error.message;
  }
};

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
    messageLoaded: false,
    loading: false,
    provider: '',
    savedEmail: '',
    textSent: false,
    confirmationResult: null,
    userLocation: null,
    ready: false,
    passwordRules: {
      show: true,
      min: 6,
      max: 50,
      numbers: 0,
      symbols: 0,
      lowercase: 0,
      uppercase: 0,
    },
  };

  componentDidMount() {
    if (!window.localStorage) return;
    const savedEmail = window.localStorage.getItem('frothyEmailAddress');
    this.setState({ savedEmail, ready: true });

    this.setState(prevState => ({
      passwordRules: {
        ...prevState.passwordRules,
        ...this.props.passwordRules,
      },
    }));
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
    const err = firebaseError(error);
    this.updateMessage({
      messageText: err,
      messageType: 'error',
    });
    this.setState({
      loading: false,
    });
    return error;
  };

  auth = () => {
    if (this.props.auth) {
      return this.props.auth();
    } else {
      const firebase = require('firebase');
      return firebase.auth();
    }
  };

  authMethod = () => {
    if (this.props.auth) {
      return this.props.auth;
    } else {
      const firebase = require('firebase');
      return firebase.auth;
    }
  };

  handleEmailSignup = (email, password) => {
    if (!this.props.emailSignup) return;
    this.handleStartAsync('email');
    return this.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ loading: false });
      })
      .catch(error => this.handleError(error));
  };

  handleEmailLogin = (email, password, remember) => {
    if (!this.props.emailLogin) return;
    this.handleStartAsync('email');
    return this.auth()
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
    return this.auth()
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
      .catch(error => this.handleError(error));
  };

  handleAnonymousLogin = () => {
    if (!this.props.anonymous) return;
    this.handleStartAsync('anonymous');
    return this.auth()
      .signInAnonymously()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => this.handleError(error));
  };

  socialLogin = providerName => {
    const auth = this.authMethod();
    const getProvider = () => {
      switch (providerName) {
        case 'facebook':
          return new auth.FacebookAuthProvider();
        case 'google':
          return new auth.GoogleAuthProvider();
        case 'twitter':
          return new auth.TwitterAuthProvider();
        case 'github':
          return new auth.GithubAuthProvider();
        default:
          break;
      }
    };

    const provider = getProvider();

    return this.auth().signInWithPopup(provider);
  };

  handleSocialLogin = provider => {
    if (!this.props[`${provider}`]) return;

    this.handleStartAsync(provider);
    this.socialLogin(provider)
      .then(user => {
        this.setState({ loading: false });
      })
      .catch(error => this.handleError(error));
  };

  handlePasswordReset = email => {
    if (!this.props.passwordReset) return;
    this.handleStartAsync('password');
    return this.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ loading: false });
        this.updateMessage({
          messageText: `An email with a password reset link has been sent to ${email}.`,
          messageType: 'success',
        });
      })
      .catch(error => this.handleError(error));
  };

  handleRememberEmail = (email, remember) => {
    if (!this.props.emailRemember || !window.localStorage) return;
    if (remember) {
      window.localStorage.setItem('frothyEmailAddress', email);
    } else if (!remember) {
      window.localStorage.removeItem('frothyEmailAddress');
    }
  };

  dismissMessage = () => {
    this.setState({
      messageText: null,
      messageType: null,
    });
  };

  updateMessage = ({ messageText, messageType }) => {
    // The messageLoaded state is due to the transistion not working when the component is conditionally
    // rendered with the same prop that is transitioning it.
    this.setState(
      {
        messageText,
        messageType,
        messageLoaded: false,
      },
      () => {
        this.setState({
          messageLoaded: true,
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

    // This is to prevent the forms from loading before the saved email
    // is retreived from localStorage
    if (!this.state.ready) {
      return null;
    }

    return (
      <StyledContainer
        shadow={this.props.shadow}
        showBorder={this.props.showBorder}
        rounded={this.props.rounded}
      >
        {this.state.messageText ? (
          <div style={{ backgroundColor: this.props.titleBackgroundColor }}>
            <Transition in={this.state.messageLoaded} timeout={duration}>
              {state => (
                <Message
                  styles={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                  dismiss={this.dismissMessage}
                  messageType={this.state.messageType}
                  titleBackgroundColor={this.props.titleBackgroundColor}
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
          />
        )}

        <Tabs
          themeColor={this.props.themeColor}
          backgroundColor={this.props.titleBackgroundColor}
          signupEnabled={this.props.emailSignup}
          loginEnabled={loginEnabled}
        >
          {loginEnabled ? (
            <TabPanel>
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
                autocomplete={this.props.autocomplete}
                auth={this.auth()}
                authMethod={this.authMethod()}
              />
            </TabPanel>
          ) : null}

          {this.props.emailSignup ? (
            <TabPanel>
              <SignupForm
                loading={this.state.loading && this.state.provider === 'email'}
                handleEmailSignup={this.handleEmailSignup}
                savedEmail={this.state.savedEmail}
                themeColor={this.props.themeColor}
                recaptcha={this.props.recaptcha}
                agree={this.props.agree}
                agreeMessage={this.props.agreeMessage}
                passwordRules={this.state.passwordRules}
              />
            </TabPanel>
          ) : null}
        </Tabs>
      </StyledContainer>
    );
  }
}

export default Container;
