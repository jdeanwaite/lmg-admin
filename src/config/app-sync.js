import AWSAppSyncClient, {
  createAppSyncLink,
  createLinkWithCache
} from "aws-appsync";
import AppSync from "../AppSync";
import { Auth } from "aws-amplify/lib/index";
import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";

const defaultState = {
  appState: {
    __typename: "AppState",
    geolocation: "null"
  }
};

// const cache = new InMemoryCache();

// const stateLink = createLinkWithCache(cache =>
//   withClientState({
//     cache,
//     resolvers: {
//       Mutation: {
//         updateGeolocation: (_, { geolocation }, { cache }) => {
//           console.log("In mutation: ", geolocation);
//           const query = gql`
//             query updateGeolocation {
//               appState @client {
//                 geolocation
//               }
//             }
//           `;
//           const previousState = cache.readQuery({ query });
//           const data = {
//             ... previousState,
//             appState: {
//               ...previousState.appState,
//               geolocation
//             }
//           }
//           console.log("Previous State: ", previousState);
//           console.log("New State: ", data);
//           return null;
//         }
//       }
//     },
//     defaults: defaultState,
//     typeDefs: gql`
//       type UnsavedChange {
//         name: String
//         enabled: Boolean
//         doctrineMarkdown: String
//         teachingMarkdown: String
//         pointsToTeachMarkdown: String
//         reflectPromps: [String]
//         videos: [VideoRef]
//         scriptureGroups: []
//       }
//
//       type VideoRef {
//         title: String
//         link: String
//       }
//     `
//   })
// );

// const appSyncLink = new createAppSyncLink({
//   url: AppSync.graphqlEndpoint,
//   region: AppSync.region,
//   auth: {
//     type: AppSync.authenticationType,
//     jwtToken: async () => {
//       return (await Auth.currentSession()).getIdToken().getJwtToken();
//     }
//   }
// });
//
// const link = ApolloLink.from([
//   apolloLogger,
//   onErrorLink,
//   stateLink,
//   appSyncLink
// ]);

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,
    jwtToken: async () => {
      return (await Auth.currentSession()).getIdToken().getJwtToken();
    }
  }
});

export default client;
