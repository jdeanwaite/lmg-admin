import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import UnsavedChangesBanner from "./UnsavedChangesBanner";
import "./PrincipleEdit.css";
import EditSectionHeader from "./EditSectionHeader";
import { Collapse, Fade, FormGroup, Input, Label } from "reactstrap";
import MarkdownEditor from "../../components/MarkdownEditor";
import VideoRefList from "../../components/VideoRefList";
import ReflectPromptList from "../../components/ReflectPromptList";

class PrincipleEdit extends Component {
  state = {
    dirty: false,
    name: "",
    enabled: 0,
    doctrineMarkdown: "",
    teachingMarkdown: "",
    pointsToTeachMarkdown: "",
    reflectPrompts: [],
    videoRefs: [],
    doctrineMinimized: false,
    teachingMinimized: false,
    pointsToTeachMinimized: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._setValuesFromPrinciple();
  }

  componentDidUpdate(prevProps) {
    const prevPrinciple = prevProps.principle;
    const currPrinciple = this.props.principle;

    if (
      currPrinciple &&
      ((!prevPrinciple && currPrinciple) ||
        prevPrinciple.id !== currPrinciple.id)
    ) {
      return this._setValuesFromPrinciple();
    }
  }

  _setValuesFromPrinciple = () => {
    const { principle } = this.props;
    if (this.props.principle) {
      const {
        name,
        doctrineMarkdown,
        teachingMarkdown,
        pointsToTeachMarkdown,
        videoRefs,
        reflectPrompts
      } = principle;
      this.setState({
        name: name || "",
        doctrineMarkdown: doctrineMarkdown || "",
        teachingMarkdown: teachingMarkdown || "",
        pointsToTeachMarkdown: pointsToTeachMarkdown || "",
        reflectPrompts: reflectPrompts || [],
        videoRefs: videoRefs || [],
        dirty: false
      });
    }
  };

  render() {
    const { principle } = this.props;

    if (!principle) {
      return null;
    }

    return (
      <div className="PrincipleEdit">
        {/*UNSAVED CHANGES BANNER*/}
        <UnsavedChangesBanner
          visible={this.state.dirty}
          onSaveClicked={this._onSaveClicked}
        />

        <div className="scrollable">
          <div className="px-3 py-3">
            {/*NAME INPUT*/}
            <div className="edit-section">
              <EditSectionHeader title="Name" />
              <Input
                value={this.state.name}
                name="name"
                onChange={this._handleInputChange}
              />
            </div>

            {/*ENABLED INPUT*/}
            <div className="edit-section">
              <EditSectionHeader title="Status" />
              <FormGroup check>
                <Label check>
                  <Input
                    value={this.state.enabled}
                    name="enabled"
                    type="checkbox"
                    onChange={this._handleInputChange}
                  />
                  Enabled
                </Label>
              </FormGroup>
            </div>

            {/*DOCTRINE EDITOR*/}
            <div className="edit-section">
              <EditSectionHeader
                title={"Doctrine"}
                minimize
                isMinimized={this.state.doctrineMinimized}
                onMinimizeToggle={this._toggleSectionMinimized("doctrine")}
              />
              <Collapse isOpen={!this.state.doctrineMinimized}>
                <MarkdownEditor
                  name="doctrineMarkdown"
                  value={this.state.doctrineMarkdown}
                  onChange={this._handleInputChange}
                />
              </Collapse>
            </div>

            {/*TEACHING EDITOR*/}
            <div className="edit-section">
              <EditSectionHeader
                title={"Teaching"}
                minimize
                isMinimized={this.state.teachingMinimized}
                onMinimizeToggle={this._toggleSectionMinimized("teaching")}
              />
              <Collapse isOpen={!this.state.teachingMinimized}>
                <MarkdownEditor
                  name="teachingMarkdown"
                  value={this.state.teachingMarkdown}
                  onChange={this._handleInputChange}
                />
              </Collapse>
            </div>

            {/*POINTS TO TEACh EDITOR*/}
            <div className="edit-section">
              <EditSectionHeader
                title={"Points to Teach"}
                minimize
                isMinimized={this.state.pointsToTeachMinimized}
                onMinimizeToggle={this._toggleSectionMinimized("pointsToTeach")}
              />
              <Collapse isOpen={!this.state.pointsToTeachMinimized}>
                <MarkdownEditor
                  name="pointsToTeachMarkdown"
                  value={this.state.pointsToTeachMarkdown}
                  onChange={this._handleInputChange}
                />
              </Collapse>
            </div>

            {/*REFLECT PROMPTS*/}
            <div className="edit-section">
              <EditSectionHeader title={"Reflect Prompts"} />
              <ReflectPromptList
                reflectPrompts={this.state.reflectPrompts}
                onChange={this._onReflectPromptsChange}
              />
            </div>

            {/*VIDEO REFS*/}
            <div className="edit-section">
              <EditSectionHeader title={"Videos"} />
              <VideoRefList
                videoRefs={this.state.videoRefs}
                onChange={this._onVideoRefsChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  _toggleSectionMinimized = name => {
    return () => {
      this.setState({
        [`${name}Minimized`]: !this.state[`${name}Minimized`]
      });
    };
  };

  _handleInputChange = event => {
    const { name, value, type, checked } = event.target;
    const checkType = ["radio", "checkbox"].includes(type);
    this.setState({ [name]: checkType ? checked : value, dirty: true });
  };

  _onReflectPromptsChange = reflectPrompts => {
    this.setState({ reflectPrompts, dirty: true });
  };

  _onVideoRefsChange = videoRefs => {
    this.setState({ videoRefs, dirty: true });
  };

  _onSaveClicked = async () => {
    console.log("save clicked");
  };
}

PrincipleEdit.propTypes = {
  principle: PropTypes.object
};

export default PrincipleEdit;
