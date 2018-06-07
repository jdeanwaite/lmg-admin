import React, { Component } from "react";
import { Query } from "react-apollo";
import AllLessonsQuery from "../../queries/AllLessonsQuery";
import "./PrinciplesPage.css";
import PrincipleSelector from "../../components/PrincipleSelector";
import PrincipleEdit from "./PrincipleEdit";
import { Route } from "react-router-dom";

class PrinciplesPage extends Component {
  render() {
    const { match, location } = this.props;
    const idFromRoute = match.params.id;
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
              let principle = null;
              if (idFromRoute) {
                const lesson = allLessons.find(
                  l => !!l.principles.find(p => p.id === idFromRoute)
                );
                principle = lesson.principles.find(p => p.id === idFromRoute);
              }
              return (
                <div className="PrinciplesPageInnerContainer">
                  <PrincipleSelector
                    lessons={allLessons}
                    selectedPrincipleId={idFromRoute}
                  />
                  <PrincipleEdit principle={principle} />
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default PrinciplesPage;
