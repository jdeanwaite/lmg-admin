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

const defaultState = {
  isOpen: false,
  principleName: "",
  lessonId: ""
};

class NewPrincipleModal extends Component {
  state = {
    ...defaultState
  };

  constructor(props) {
    super(props);
    const { lessons } = props;
    if (lessons && lessons.length) {
      this.state.lessonId = lessons[0].id;
    }
  }

  render() {
    return (
      <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
        <Query query={AllLessonsQuery} fetchPolicy="cache-first">
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading</p>;
            } else if (error) {
              return <p>Error!</p>;
            } else {
              const { allLessons } = data;
              return (
                <Mutation
                  mutation={AddPrincipleMutation}
                  onCompleted={this._reset}
                  update={this._update}
                >
                  {(addPrinciple, { loading }) => (
                    <Form onSubmit={event => this._submit(event, addPrinciple)}>
                      <ModalHeader toggle={this.toggle}>
                        New Principle
                      </ModalHeader>
                      <ModalBody>
                        <p>
                          To add a new Principle, give it a name and assign it
                          to a lesson.
                        </p>
                        <FormGroup>
                          <Input
                            type="text"
                            placeholder="Name"
                            value={this.state.principleName}
                            onChange={this._onPrincipleNameChange}
                            required
                            id="principleName"
                            name="principleName"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type="select"
                            required
                            id="lessonId"
                            name="lessonId"
                            value={this.state.lessonId}
                            onChange={this._onLessonIdChange}
                          >
                            <option value="">Select a lesson</option>
                            {allLessons.map(lesson => (
                              <option key={lesson.id} value={lesson.id}>
                                {lesson.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                          Cancel
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          disabled={loading}
                        >
                          Add
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Mutation>
              );
            }
          }}
        </Query>
      </Modal>
    );
  }

  _onPrincipleNameChange = event => {
    const principleName = event.target.value;
    this.setState({ principleName });
  };

  _onLessonIdChange = event => {
    const lessonId = event.target.value;
    this.setState({ lessonId });
  };

  _update = (cache, { data: { addPrinciple } }) => {
    const { allLessons } = cache.readQuery({ query: AllLessonsQuery });
    console.log("allLessons", allLessons);
    console.log("addPrinciple", addPrinciple);
    const lesson = allLessons.find(
      lesson => lesson.id === addPrinciple.lessonId
    );
    lesson.principles.push(addPrinciple);

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
    const { principleName, lessonId } = this.state;
    console.log("submit", principleName, lessonId);
    addPrinciple({
      variables: {
        name: principleName,
        lessonId
      }
    });
    event.preventDefault();
  };

  _reset = () => {
    this.setState(defaultState);
  };
}

NewPrincipleModal.propTypes = {
  // onReturn: PropTypes.func.isRequired,
  // lessons: PropTypes.array.isRequired
};

export default NewPrincipleModal;
