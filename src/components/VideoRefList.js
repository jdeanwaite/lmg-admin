import React, { Component } from "react";
import PropTypes from "prop-types";
import "./VideoRefList.css";
import VideoRef from "./VideoRef";
import { Button } from "reactstrap";

class VideoRefList extends Component {
  render() {
    const { videoRefs } = this.props;

    return (
      <div className="VideoRefList">
        {videoRefs.map((r, i) => (
          <VideoRef
            key={i}
            videoRef={r}
            onSubmit={this._onVideoRefSubmit(i)}
            onChange={this._onVideoRefChange(i)}
            onDelete={this._onVideoRefDelete(i)}
          />
        ))}
        <Button color="primary" onClick={this._onAddClicked}>
          Add Video
        </Button>
      </div>
    );
  }

  _onVideoRefSubmit = index => {
    return () => {
      console.log("submitted", index);
      this._onAddClicked();
    };
  };

  _onVideoRefChange = index => {
    return videoRef => {
      const videoRefs = [...this.props.videoRefs];
      videoRefs[index] = videoRef;
      this._onVideoRefsChange(videoRefs);
    };
  };

  _onVideoRefDelete = index => {
    return () => {
      const videoRefs = this.props.videoRefs.filter((r, i) => i !== index);
      this._onVideoRefsChange(videoRefs);
    };
  };

  _onAddClicked = () => {
    const videoRefs = [
      ...this.props.videoRefs,
      {
        title: "",
        link: ""
      }
    ];
    this._onVideoRefsChange(videoRefs);
  };

  _onVideoRefsChange = videoRefs => {
    if (this.props.onChange) {
      this.props.onChange(videoRefs);
    }
  };
}

VideoRefList.propTypes = {
  videoRefs: PropTypes.array,
  onChange: PropTypes.func
};

VideoRefList.defaultProps = {
  videoRefs: []
};

export default VideoRefList;
