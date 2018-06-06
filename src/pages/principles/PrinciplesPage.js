import React, { Component } from "react";
import { Query } from "react-apollo";
import AllLessonsQuery from "../../queries/AllLessonsQuery";
import { Button, Table } from "reactstrap";
import "./PrinciplesPage.css";
import NewPrincipleModal from "./NewPrincipleModal";
import { Link } from 'react-router-dom'

class PrinciplesPage extends Component {
  render() {
    return (
      <div className="PrinciplesPage">
        <Query query={AllLessonsQuery} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading && (!data || !data.allLessons)) {
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
                  <div className="table-header">
                    <h1>Principles</h1>
                    <Button color="primary" onClick={this.onNewClicked}>
                      New
                    </Button>
                  </div>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Principle</th>
                        <th>Lesson</th>
                      </tr>
                    </thead>
                    <tbody>
                      {principles.map(principle => (
                        <tr key={principle.id}>
                          <td><Link to={"principles/" + principle.id}>{principle.name}</Link></td>
                          <td><Link to="#">{principle.lesson}</Link></td>
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
