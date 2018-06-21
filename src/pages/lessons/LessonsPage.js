import React, { Component } from "react";
import AllLessonsQuery from "../../queries/AllLessonsQuery";
import { Query } from "react-apollo";
import { Button, Table } from "reactstrap";
import NewLessonModal from "./NewLessonModal";
import { Link } from "react-router-dom";

class LessonsPage extends Component {
  render() {
    return (
      <Query query={AllLessonsQuery} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading && (!data || !data.allLessons)) {
            return <p>Loading...</p>;
          } else if (error) {
            return <p>There was an error loading the lessons.</p>;
          } else {
            const { allLessons } = data;
            return (
              <div className="px-3 py-3">
                <NewLessonModal ref={ref => (this.newLessonModal = ref)} />
                <div className="table-header">
                  <h1>Lessons</h1>
                  <Button color="primary" onClick={this.onNewClicked}>
                    New
                  </Button>
                </div>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Lesson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLessons.map(lesson => (
                      <tr key={lesson.id}>
                        <td>
                          <Link
                            to={`/admin/principles/${lesson.principles[0].id}`}
                          >
                            {lesson.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          }
        }}
      </Query>
    );
  }

  onNewClicked = () => {
    this.newLessonModal.toggle();
  };
}

export default LessonsPage;
