import React, { Component } from "react";
import AllLessonsQuery from "../../queries/AllLessonsQuery";
import { Query } from "react-apollo";
import { ListGroup, ListGroupItem } from "reactstrap";

class LessonsPage extends Component {
  render() {
    return (
      <Query query={AllLessonsQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          } else if (error) {
            return <p>There was an error loading the lessons.</p>;
          } else {
            const { allLessons } = data;
            const lessons = allLessons.map(lesson => (
              <ListGroupItem key={lesson.id} tag="a" href="#">
                {lesson.name}
              </ListGroupItem>
            ));
            return <ListGroup>{lessons}</ListGroup>;
          }
        }}
      </Query>
    );
  }
}

export default LessonsPage;
