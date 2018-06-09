import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ErrorModal extends Component {
  render() {
    return (
      <Modal isOpen={!!this.props.message} toggle={this.props.clear}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{this.props.message}</ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={this.props.clear}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ErrorModal.propTypes = {
  clear: PropTypes.func,
  message: PropTypes.string
};

ErrorModal.defaultProps = {
  message: null
};

export default ErrorModal;
