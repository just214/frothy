import React, { Component } from 'react';
import Modal from 'react-modal';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function ReactModalAdapter({
  className,
  overlayClassName,
  modalClassName,
  ...props
}) {
  return (
    <ReactModal
      className={modalClassName}
      overlayClassName={overlayClassName}
      portalClassName={className}
      {...props}
    />
  );
}

const StyledModal = styled(ReactModalAdapter).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Modal',
})`
  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rebeccapurple;
  }
  .Modal {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    background-color: papayawhip;
  }
`;

class ModalComponent extends Component {
  state = {
    modalIsOpen: false,
    modalAnimation: true,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true }, () => {
      this.setState({
        modalAnimation: true,
      });
    });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const ModalButton = this.props.modalButton;

    return (
      <div>
        <div onClick={this.openModal}>{this.props.modalButton}</div>

        <Transition in={this.state.modalAnimation} timeout={duration}>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Frothy Login Modal"
                closeTimeoutMS={100}
              >
                {this.props.children}
              </Modal>
              {/* <StyledModal
                isOpen={this.state.showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.handleCloseModal}
              >
                <p>Modal text!</p>
                <button onClick={this.handleCloseModal}>Close Modal</button>
              </StyledModal> */}
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default ModalComponent;
