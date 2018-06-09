import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ScriptureGroupList.css";
import ScriptureGroup from "./ScriptureGroup";
import { Button } from "reactstrap";
import * as shortid from "shortid";

class ScriptureGroupList extends Component {
  render() {
    const { scriptureGroups } = this.props;
    return (
      <div className="ScriptureGroupList">
        {scriptureGroups.map(sg => (
          <ScriptureGroup
            key={sg.id}
            scriptureGroup={sg}
            onChange={this._onGroupChange}
            onDelete={this._onGroupDelete(sg.id)}
          />
        ))}
        <hr />
        <Button color="primary" onClick={this._onGroupAdd}>
          Add Group
        </Button>
      </div>
    );
  }

  _onGroupAdd = () => {
    const scriptureGroups = [
      ...this.props.scriptureGroups,
      {
        id: shortid.generate(),
        title: "",
        scriptures: []
      }
    ];
    this._triggerChange(scriptureGroups);
  };

  _onGroupChange = scriptureGroup => {
    const scriptureGroups = [...this.props.scriptureGroups];
    scriptureGroups[
      scriptureGroups.findIndex(sg => sg.id === scriptureGroup.id)
    ] = scriptureGroup;
    this._triggerChange(scriptureGroups);
  };

  _onGroupDelete = id => {
    return () => {
      const scriptureGroups = this.props.scriptureGroups.filter(
        sg => sg.id !== id
      );
      this._triggerChange(scriptureGroups);
    };
  };

  _triggerChange = scriptureGroups => {
    if (this.props.onChange) {
      this.props.onChange(scriptureGroups);
    }
  };
}

ScriptureGroupList.propTypes = {
  scriptureGroups: PropTypes.array,
  onChange: PropTypes.func
};

ScriptureGroupList.defaultProps = {
  scriptureGroups: []
};

export default ScriptureGroupList;
