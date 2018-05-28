import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import AWSAppSyncClient from "aws-appsync";
import AppSync from "./AppSync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import NavBar from './components/NavBar'

// Amplify.Logger.LOG_LEVEL = 'DEBUG'

Amplify.configure({
  Auth: {
    // // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: "us-west-2:8e28042b-13a3-4aac-b994-e24fe68819af",
    // REQUIRED - Amazon Cognito Region
    region: "us-west-2",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-west-2_y8yIMg3OB",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "r3manogk5na8dc8mroh2fm6ur",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true
  }
});

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,
    // credentials: () => {
    //   console.log("returning creds");
    //   return Auth.currentCredentials();
    // },
    jwtToken: async () => {
      return (await Auth.currentSession()).getIdToken().getJwtToken();
    }
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar onStateChange={this.props.onStateChange} />
        <Route path="/" exact render={() => <Redirect from="/" to="/admin" />} />
        <Route
          path="/admin"
          render={props => (
            <Admin {...props} onStateChange={this.props.onStateChange} />
          )}
        />
      </div>
    );
  }
}

const AppWithRouting = props => {
  return (
    <BrowserRouter>
      <App onStateChange={props.onStateChange} />
    </BrowserRouter>
  );
};

const AppWithApolloProvider = props => {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <AppWithRouting {...props} />
      </Rehydrated>
    </ApolloProvider>
  );
};

export default withAuthenticator(AppWithApolloProvider);
