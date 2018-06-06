import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Query, Mutation } from "react-apollo";
import AllLessonsQuery from "../../queries/AllLessonsQuery";
import AddPrincipleMutation from "../../queries/AddPrincipleMutation";
import AddLessonMutation from "../../queries/AddLessonMutation";

const defaultState = {
  isOpen: false,
  lessonName: ""
};

class NewLessonModal extends Component {
  state = {
    ...defaultState
  };

  render() {
    return (
      <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
        <Mutation
          mutation={AddLessonMutation}
          onCompleted={this._reset}
          update={this._update}
        >
          {(addLesson, { loading }) => (
            <Form onSubmit={event => this._submit(event, addLesson)}>
              <ModalHeader toggle={this.toggle}>New Lesson</ModalHeader>
              <ModalBody>
                <p>To add a new Lesson, give it a name.</p>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={this.state.lessonName}
                    onChange={this._onLessonNameChange}
                    required
                    id="lessonName"
                    name="lessonName"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" disabled={loading}>
                  Add
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Mutation>
      </Modal>
    );
  }

  _onLessonNameChange = event => {
    const lessonName = event.target.value;
    this.setState({ lessonName });
  };

  _update = (cache, { data: { addLesson } }) => {
    const { allLessons } = cache.readQuery({ query: AllLessonsQuery });
    allLessons.push(addLesson);

    console.log('allLessons', allLessons);

    cache.writeQuery({
      query: AllLessonsQuery,
      data: { allLessons }
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  _submit = (event, addPrinciple) => {
    const { lessonName } = this.state;
    console.log("submit", lessonName);
    addPrinciple({
      variables: {
        name: lessonName
      }
    });
    event.preventDefault();
  };

  _reset = () => {
    this.setState(defaultState);
  };
}

// NewPrincipleModal.propTypes = {
//   // onReturn: PropTypes.func.isRequired,
//   // lessons: PropTypes.array.isRequired
// };

export default NewLessonModal;
