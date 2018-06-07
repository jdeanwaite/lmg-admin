import React, { Component } from "react";
import SideBar from "../../components/SideBar";
import PrinciplesPage from "../principles/PrinciplesPage";
import { Redirect, Route } from "react-router-dom";
import DashboardPage from "../dashboard/DashboardPage";
import LessonsPage from "../lessons/LessonsPage";

class Admin extends Component {
  render() {
    const { match, location } = this.props;
    return (
      <div className="container-fluid flex-1">
        <div className="row flex-1">
          <SideBar location={location} />
          <div className="flex-1">
            <Route
              path={match.url + "/"}
              exact
              render={() => (
                <Redirect from={match.url + "/"} to={match.url + "/lessons"} />
              )}
            />
            <Route path={match.url + "/lessons"} component={LessonsPage} />
            <Route
              path={match.url + "/principles/:id?"}
              component={PrinciplesPage}
            />
            <Route path={match.url + "/dashboard"} component={DashboardPage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
