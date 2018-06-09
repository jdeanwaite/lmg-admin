import React, { Component } from "react";
import PropTypes from "prop-types";
import "./VideoRefList.css";
import VideoRef from "./VideoRef";
import { Button } from "reactstrap";
import * as shortid from "shortid";

class VideoRefList extends Component {
  render() {
    const { videoRefs } = this.props;

    return (
      <div className="VideoRefList">
        {videoRefs.map(r => (
          <VideoRef
            key={r.id}
            videoRef={r}
            onSubmit={this._onVideoRefSubmit}
            onChange={this._onVideoRefChange(r.id)}
            onDelete={this._onVideoRefDelete(r.id)}
          />
        ))}
        <Button color="primary" onClick={this._onAddClicked}>
          Add Video
        </Button>
      </div>
    );
  }

  _onVideoRefSubmit = () => {
    this._onAddClicked();
  };

  _onVideoRefChange = id => {
    return videoRef => {
      const videoRefs = [...this.props.videoRefs];
      videoRefs[videoRefs.findIndex(v => v.id === id)] = videoRef;
      this._onVideoRefsChange(videoRefs);
    };
  };

  _onVideoRefDelete = id => {
    return () => {
      const videoRefs = this.props.videoRefs.filter(r => r.id !== id);
      this._onVideoRefsChange(videoRefs);
    };
  };

  _onAddClicked = () => {
    const videoRefs = [
      ...this.props.videoRefs,
      {
        id: shortid.generate(),
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
