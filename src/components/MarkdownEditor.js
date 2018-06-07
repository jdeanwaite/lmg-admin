import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MarkdownEditor.css";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

class MarkdownEditor extends Component {
  state = {
    activeTab: "1"
  };

  render() {
    return (
      <div className="MarkdownEditor">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Edit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Preview
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="editor">
            <textarea name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
          </TabPane>
          <TabPane tabId="2">Preview functionality coming soon.</TabPane>
        </TabContent>
      </div>
    );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default MarkdownEditor;
