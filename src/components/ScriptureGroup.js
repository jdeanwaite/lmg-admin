import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ScriptureGroup.css";
import { Button, Input } from "reactstrap";
import Scripture from "./Scripture";
import ConfirmModal from "./ConfirmModal";
import shortid from "shortid";

class ScriptureGroup extends Component {
  state = {
    confirmModalOpen: false
  };

  render() {
    return (
      <div className="ScriptureGroup">
        <Input
          type="text"
          name="title"
          value={this.props.scriptureGroup.title}
          placeholder="What is the nature of God the Father and Jesus Christ?"
          onChange={this._onInputChange}
        />
        <div className="scriptures">
          {this.props.scriptureGroup.scriptures.map(s => (
            <Scripture
              key={s.id}
              scripture={s}
              onChange={this._onScriptureChange(s.id)}
              onDelete={this._onScriptureDelete(s.id)}
            />
          ))}
        </div>
        <div className="actions">
          <Button color="primary" onClick={this._onScriptureAdd}>
            Add Scripture
          </Button>
          <Button color="danger" onClick={this._toggleConfirmModal}>
            Delete Group
          </Button>
        </div>

        <ConfirmModal
          isOpen={this.state.confirmModalOpen}
          toggle={this._toggleConfirmModal}
          onConfirm={this.props.onDelete}
        />
      </div>
    );
  }

  _toggleConfirmModal = () => {
    this.setState({ confirmModalOpen: !this.state.confirmModalOpen });
  };

  _onScriptureAdd = () => {
    const scriptureGroup = {
      ...this.props.scriptureGroup
    };
    console.log("scriptureGRoup", scriptureGroup);
    console.log(scriptureGroup.scriptures)
    scriptureGroup.scriptures = scriptureGroup.scriptures.concat([
      {
        id: shortid.generate(),
        text: "",
        link: ""
      }
    ]);
    this._triggerChange(scriptureGroup);
  };

  _onInputChange = event => {
    const { name, value } = event.target;
    const scriptureGroup = {
      ...this.props.scriptureGroup,
      [name]: value
    };
    this._triggerChange(scriptureGroup);
  };

  _onScriptureChange = id => {
    return scripture => {
      const scriptureGroup = {
        ...this.props.scriptureGroup,
        scriptures: [
          ...this.props.scriptureGroup.scriptures
        ]
      };
      scriptureGroup.scriptures [
        scriptureGroup.scriptures.findIndex(s => s.id === id)
      ] = scripture;
      this._triggerChange(scriptureGroup);
    };
  };

  _onScriptureDelete = id => {
    return () => {
      const scriptureGroup = {
        ...this.props.scriptureGroup,
        scriptures: this.props.scriptureGroup.scriptures.filter(
          s => s.id !== id
        )
      };
      this._triggerChange(scriptureGroup);
    };
  };

  _triggerChange = scriptureGroup => {
    if (this.props.onChange) {
      this.props.onChange(scriptureGroup);
    }
  };
}

ScriptureGroup.propTypes = {
  scriptureGroup: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func
};

ScriptureGroup.defaultProps = {
  scriptureGroup: {
    id: "",
    title: "",
    scriptures: []
  }
};

export default ScriptureGroup;
