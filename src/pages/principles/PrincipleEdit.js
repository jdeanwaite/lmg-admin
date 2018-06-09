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
import ScriptureGroupList from "../../components/ScriptureGroupList";
import UpdatePrincipleMutation from "../../queries/UpdatePrincipleMutation";
import ErrorModal from "../../components/ErrorModal";

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
    scriptureGroups: [],
    doctrineMinimized: false,
    teachingMinimized: false,
    pointsToTeachMinimized: false,
    errorMessage: null
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
        reflectPrompts,
        enabled,
        scriptureGroups
      } = principle;
      this.setState({
        name: name || "",
        doctrineMarkdown: doctrineMarkdown || "",
        teachingMarkdown: teachingMarkdown || "",
        pointsToTeachMarkdown: pointsToTeachMarkdown || "",
        reflectPrompts: reflectPrompts || [],
        videoRefs: videoRefs || [],
        enabled: enabled || 0,
        scriptureGroups: scriptureGroups || [],
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
        <Mutation
          mutation={UpdatePrincipleMutation}
          onCompleted={this._onUpdateComplete}
          onError={this._onUpdateError}
        >
          {(updatePrinciple, { loading }) => (
            <UnsavedChangesBanner
              visible={this.state.dirty}
              saving={loading}
              onSaveClicked={this._onSaveClicked(updatePrinciple)}
            />
          )}
        </Mutation>

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
                    value={this.state.enabled ? "on" : "off"}
                    checked={this.state.enabled}
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

            {/*SCRIPTURE GROUPS*/}
            <div className="edit-section">
              <EditSectionHeader title={"Scripture Groups"} />
              <ScriptureGroupList
                scriptureGroups={this.state.scriptureGroups}
                onChange={this._onScriptureGroupsChange}
              />
            </div>
          </div>
        </div>
        <ErrorModal
          message={this.state.errorMessage}
          clear={() => this.setState({ errorMessage: null })}
        />
      </div>
    );
  }

  _onUpdateComplete = () => {
    this.setState({ dirty: false });
  };

  _onUpdateError = () => {
    this.setState({
      errorMessage: "An error occurred updating the principle."
    });
  };

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
    this.setState({ [name]: checkType ? +checked : value, dirty: true });
  };

  _onReflectPromptsChange = reflectPrompts => {
    this.setState({ reflectPrompts, dirty: true });
  };

  _onVideoRefsChange = videoRefs => {
    this.setState({ videoRefs, dirty: true });
  };

  _onScriptureGroupsChange = scriptureGroups => {
    this.setState({ scriptureGroups, dirty: true });
  };

  _onSaveClicked = updatePrinciple => {
    return () => {
      console.log("save clicked");
      const updates = {};
      if (this.props.principle.name !== this.state.name) {
        updates.name = this.state.name;
      }
      if (this.props.principle.enabled !== this.state.enabled) {
        updates.enabled = this.state.enabled;
      }
      if (
        this.state.doctrineMarkdown !== this.props.principle.doctrineMarkdown
      ) {
        updates.doctrineMarkdown = this.state.doctrineMarkdown;
      }
      if (
        this.state.teachingMarkdown !== this.props.principle.teachingMarkdown
      ) {
        updates.teachingMarkdown = this.state.teachingMarkdown;
      }
      if (
        this.state.pointsToTeachMarkdown !==
        this.props.principle.pointsToTeachMarkdown
      ) {
        updates.pointsToTeachMarkdown = this.state.pointsToTeachMarkdown;
      }
      if (this.state.reflectPrompts !== this.props.principle.reflectPrompts) {
        updates.reflectPrompts = this.state.reflectPrompts.length
          ? this.state.reflectPrompts
          : null;
      }
      if (this.state.videoRefs !== this.props.principle.videoRefs) {
        updates.videoRefs = this.state.videoRefs.length
          ? this.state.videoRefs
          : null;
      }
      if (this.state.scriptureGroups !== this.props.principle.scriptureGroups) {
        updates.scriptureGroups = this.state.scriptureGroups.length
          ? this.state.scriptureGroups
          : null;
      }

      console.log("updates", updates);
      updatePrinciple({
        variables: omitDeep(
          {
            id: this.props.principle.id,
            updates
          },
          "__typename"
        )
      });
    };
  };
}

PrincipleEdit.propTypes = {
  principle: PropTypes.object
};

export default PrincipleEdit;

function omitDeep(obj, key) {
  if (Array.isArray(obj)) return omitDeepArrayWalk(obj, key);
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach(i => {
    if (i !== key) {
      const val = obj[i];
      if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === "object" && val !== null)
        newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });
  return newObj;
}

function omitDeepArrayWalk(arr, key) {
  return arr.map(val => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    else if (typeof val === "object") return omitDeep(val, key);
    return val;
  });
}
