import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Input, Row } from "reactstrap";
import './Scripture.css';

class Scripture extends Component {
  render() {
    return (
      <div className="Scripture">
        <Form>
          <Row>
            <Col>
              <Row>
                <Col xs={12} sm={5} md={3}>
                  <Input
                    type="text"
                    name="text"
                    placeholder="1 Nephi 2:3"
                    value={this.props.scripture.text}
                    onChange={this._onInputChange}
                  />
                </Col>
                <Col xs={12} sm={7} md={9}>
                  <Input
                    type="text"
                    name="link"
                    placeholder="gospellibrary://content/scriptures/bofm/1-ne/2.3-5?lang=eng"
                    value={this.props.scripture.link}
                    onChange={this._onInputChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="auto">
              <Button color="danger" onClick={this.props.onDelete}>
                X
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  _onInputChange = event => {
    const { name, value } = event.target;
    const scripture = {
      ...this.props.scripture,
      [name]: value
    };
    this._triggerChange(scripture);
  };

  _triggerChange = scripture => {
    if (this.props.onChange) {
      this.props.onChange(scripture);
    }
  };
}

Scripture.propTypes = {
  scripture: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func
};

Scripture.defeaultProps = {
  scripture: {
    id: "1",
    text: "",
    link: ""
  }
};

export default Scripture;
