import React, { Component } from "react";
import PropTypes from "prop-types";
import LessonSelector from "./LessonSelector";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import NewPrincipleModal from "../pages/principles/NewPrincipleModal";

class PrincipleSelector extends Component {
  state = {
    selectedLessonId: ""
  };

  render() {
    const { lessons, selectedPrincipleId } = this.props;

    const lessonFromRoute = selectedPrincipleId
      ? lessons.find(
          l => !!l.principles.find(p => p.id === selectedPrincipleId)
        )
      : null;

    const selectedLesson = this.state.selectedLessonId
      ? lessons.find(l => l.id === this.state.selectedLessonId)
      : selectedPrincipleId ? lessonFromRoute : null;

    const selectedLessonPrinciples = selectedLesson
      ? selectedLesson.principles
      : [];

    return (
      <div className="PrincipleSelector">
        <LessonSelector
          lessons={lessons}
          onChange={selectedLessonId => this.setState({ selectedLessonId })}
          value={
            this.state.selectedLessonId ||
            (lessonFromRoute && lessonFromRoute.id)
          }
        />
        <div className={"principle-links"}>
          {selectedLessonPrinciples.map(p => (
            <Link key={p.id} to={`/admin/principles/${p.id}`}>
              {p.name}
            </Link>
          ))}
        </div>
        <hr />
        <div className="order-buttons">
          <Button color="primary" size={"sm"}>
            Move Up
          </Button>
          <Button color="primary" size={"sm"}>
            Move Down
          </Button>
        </div>
        <hr />
        <Button color="primary" onClick={this.onNewClicked}>
          New Principle
        </Button>
        <NewPrincipleModal ref={ref => (this.newPrincipleModal = ref)} />
      </div>
    );
  }

  onNewClicked = () => {
    this.newPrincipleModal.toggle();
  };
}

PrincipleSelector.propTypes = {
  lessons: PropTypes.array.isRequired,
  selectedPrincipleId: PropTypes.string
};

export default PrincipleSelector;
