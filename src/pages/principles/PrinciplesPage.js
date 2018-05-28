import React, { Component } from "react";
import { Query } from "react-apollo";
import AllLessonsQuery from "../../queries/AllLessonsQuery";
import { Button, Table } from "reactstrap";
import "./PrinciplesPage.css";
import NewPrincipleModal from "./NewPrincipleModal";

class PrinciplesPage extends Component {
  render() {
    return (
      <div className="PrinciplesPage">
        <Query query={AllLessonsQuery} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            } else if (error) {
              console.log("error", error);
              return <p>Error!</p>;
            } else {
              const { allLessons } = data;
              const principles = [];
              for (const lesson of allLessons) {
                principles.push(
                  ...lesson.principles.map(principle => ({
                    lesson: lesson.name,
                    ...principle
                  }))
                );
              }
              return (
                <div>
                  <NewPrincipleModal
                    ref={ref => (this.newPrincipleModal = ref)}
                  />
                  <div className="custom-header">
                    <h1>Principles</h1>
                    <Button color="primary" onClick={this.onNewClicked}>
                      New
                    </Button>
                  </div>
                  <Table hover responsive bordered>
                    <thead>
                      <tr>
                        <th>Lesson</th>
                        <th>Principle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {principles.map(principle => (
                        <tr key={principle.id}>
                          <td>{principle.lesson}</td>
                          <td>{principle.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }

  onNewClicked = () => {
    this.newPrincipleModal.toggle();
  };
}

export default PrinciplesPage;
