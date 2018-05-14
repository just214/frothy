import React, { Component } from 'react';
import Modal from 'react-modal';
import Transition from 'react-transition-group/Transition';
import styled, { keyframes } from 'styled-components';
import CloseIcon from '../icons/close.svg';

const fadeIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0);
    opacity: 0;
  }
`;

const Fade = styled.div`
  animation: ${props => (props.out ? fadeOut : fadeIn)} 0.2s linear;
`;

const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledCloseIcon = styled.img`
  cursor: pointer;
  height: 20px;
  width: 20px;

  :hover {
    opacity: 0.9;
  }
`;

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
} else {
  Modal.setAppElement('#root');
}

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

class ModalComponent extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const ModalButton = this.props.modalButton;
    const customStyles = {
      overlay: {
        backgroundColor: this.props.modalOverlay
          ? 'rgba(0, 0, 0, 0.8)'
          : 'none',
        position: 'absolute',
        minHeight: '100vh',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '60px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

        border: 'none',
        borderRadius: getBorderRadius(this.props.rounded),
        backgroundColor: 'transparent',
        textAlign: 'center',
      },
    };
    return (
      <div>
        <div onClick={this.openModal}>{this.props.modalButton}</div>

        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Frothy Login Modal"
            closeTimeoutMS={100}
          >
            <Fade out={!this.state.modalIsOpen}>
              <CloseIconWrapper>
                <StyledCloseIcon src={CloseIcon} onClick={this.closeModal} />
              </CloseIconWrapper>

              {this.props.children}
            </Fade>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ModalComponent;
