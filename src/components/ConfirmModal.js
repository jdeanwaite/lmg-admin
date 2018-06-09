import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ConfirmModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>Confirm action</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this._onCancelClick}>
            Cancel
          </Button>
          <Button color="primary" type="submit" onClick={this._onConfirmClick}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  _onConfirmClick = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
    if (this.props.toggle) {
      this.props.toggle();
    }
  };

  _onCancelClick = () => {
    if (this.props.toggle) {
      this.props.toggle();
    }
  }
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onConfirm: PropTypes.func
};

ConfirmModal.defaultProps = {
  isOpen: false
};

export default ConfirmModal;
