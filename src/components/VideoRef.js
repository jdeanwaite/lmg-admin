import React, { Component } from "react";
import PropTypes from "prop-types";
import "./VideoRef.css";
import { Button, Input, Form } from "reactstrap";

class VideoRef extends Component {
  render() {
    const { videoRef } = this.props;
    return (
      <div className="VideoRef">
        <Form onSubmit={this._onFormSubmit}>
          <div className="row-nowrap">
            <div className="col-nowrap">
              <span>Title</span>
              <span>Link</span>
            </div>
            <div className="col-nowrap flex-1">
              <Input
                name="title"
                value={videoRef.title}
                onChange={this._onChange}
                style={{ marginBottom: "8px" }}
                placeholder="Title"
                required
              />
              <Input
                name="link"
                value={videoRef.link}
                onChange={this._onChange}
                placeholder="gospellibrary://"
                required
              />
            </div>
            <div style={{ marginLeft: "8px" }}>
              <Button type="button" color="danger" onClick={this.props.onDelete}>
                X
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }

  _onFormSubmit = event => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  _onChange = event => {
    if (this.props.onChange) {
      this.props.onChange({
        ...this.props.videoRef,
        ...{
          [event.target.name]: event.target.value
        }
      });
    }
  };
}

VideoRef.propTypes = {
  videoRef: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
};

VideoRef.defaultProps = {
  videoRef: {
    id: "1",
    title: "",
    link: ""
  }
};

export default VideoRef;
