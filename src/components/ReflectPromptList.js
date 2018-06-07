import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ReflectPromptList.css";
import { Button, Input } from "reactstrap";

class ReflectPromptList extends Component {
  render() {
    const { reflectPrompts } = this.props;
    return (
      <div className="ReflectPromptList">
        {reflectPrompts.map((r, i) => (
          <div className="row-nowrap">
            <Input key={i} value={r} onChange={this._onPromptChange(i)} />
            <Button color="danger" onClick={this._onPromptDelete(i)}>
              X
            </Button>
          </div>
        ))}
        <Button color={"primary"} onClick={this._onAddPromptClicked}>Add Prompt</Button>
      </div>
    );
  }

  _onPromptChange = index => {
    return event => {
      const prompts = [...this.props.reflectPrompts];
      prompts[index] = event.target.value;
      this._onPromptsChange(prompts);
    };
  };

  _onPromptDelete = index => {
    return () => {
      const prompts = this.props.reflectPrompts.filter((p, i) => i !== index);
      this._onPromptsChange(prompts);
    };
  };

  _onAddPromptClicked = () => {
    const prompts = [...this.props.reflectPrompts, ""];
    this._onPromptsChange(prompts);
  };

  _onPromptsChange = prompts => {
    if (this.props.onChange) {
      this.props.onChange(prompts);
    }
  };
}

ReflectPromptList.propTypes = {
  reflectPrompts: PropTypes.array,
  onChange: PropTypes.func
};

ReflectPromptList.defaultProps = {
  reflectPrompts: []
};

export default ReflectPromptList;
