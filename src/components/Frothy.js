import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import Modal from './Modal';
import 'typeface-roboto';
import { Button } from './common';

const Frothy = props => {
  if (props.modal) {
    return (
      <Modal
        modalButton={props.modalButton}
        rounded={props.rounded}
        modalOverlay={props.modalOverlay}
      >
        <Container {...props} />
      </Modal>
    );
  } else {
    return <Container {...props} />;
  }
};

export default Frothy;

const ModalButton = props => (
  <Button style={{ width: '80px' }} themeColor={'#2196F3'}>
    Sign In
  </Button>
);

Frothy.propTypes = {
  // Firebase
  auth: PropTypes.func,

  // Modal
  modal: PropTypes.bool,
  modalButton: PropTypes.element,
  modalOverlay: PropTypes.bool,

  // General Styling
  themeColor: PropTypes.string,
  showBorder: PropTypes.bool,
  rounded: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  shadow: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  showLabels: PropTypes.bool,

  // Header Styling
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleColor: PropTypes.string,
  titleBackgroundColor: PropTypes.string,

  // Auth
  emailLogin: PropTypes.bool,
  emailRemember: PropTypes.bool,
  emailSignup: PropTypes.bool,
  passwordRules: PropTypes.shape({
    show: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    lowercase: PropTypes.number,
    uppercase: PropTypes.number,
    symbols: PropTypes.number,
    numbers: PropTypes.number,
  }),
  agree: PropTypes.bool,
  agreeMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  autocomplete: PropTypes.bool,
  passwordReset: PropTypes.bool,
  anonymous: PropTypes.bool,
  phone: PropTypes.bool,
  recaptcha: PropTypes.oneOf(['normal', 'invisible']),
  recaptchaBadge: PropTypes.oneOf(['inline', 'bottomright', 'bottomleft']),
  google: PropTypes.bool,
  facebook: PropTypes.bool,
  twitter: PropTypes.bool,
  github: PropTypes.bool,

  // Pass-throughs
  style: PropTypes.object,
  className: PropTypes.string,
};

Frothy.defaultProps = {
  // Modal
  modal: false,
  modalButton: <ModalButton />,
  modalOverlay: true,

  // General Styling
  themeColor: '#2196F3',
  showBorder: true,
  rounded: 1,
  shadow: 3,
  showLabels: false,

  // Header Styles
  title: 'Welcome to Frothy!',
  titleColor: '#424242',
  titleBackgroundColor: '#ededed',

  // Auth
  emailLogin: true,
  emailRemember: true,
  emailSignup: true,
  passwordRules: {
    show: true,
    min: 6,
    max: 50,
    lowercase: 0,
    uppercase: 0,
    symbols: 0,
    numbers: 0,
  },
  agree: false,
  agreeMessage: 'I agree to the terms of service.',
  autocomplete: true,
  passwordReset: true,
  phone: true,
  recaptcha: 'invisible',
  recaptchaBadge: 'inline',
  anonymous: true,
  google: true,
  facebook: true,
  twitter: true,
  github: true,
};
