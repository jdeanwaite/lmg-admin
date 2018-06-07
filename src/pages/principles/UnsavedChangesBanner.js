import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import "./UnsavedChangesBanner.css";

class UnsavedChangesBanner extends Component {
  render() {
    const { visible, onSaveClicked } = this.props;
    if (!visible) {
      return (
        <div className="UpToDateBanner">
          <p>No changes.</p>
        </div>
      )
    }
    return (
      <div className="UnsavedChangesBanner">
        <p>You have unsaved changes.</p>
        <Button size="sm" color="white" onClick={onSaveClicked}>
          Save
        </Button>
      </div>
    );
  }
}

UnsavedChangesBanner.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSaveClicked: PropTypes.func.isRequired
};

export default UnsavedChangesBanner;
