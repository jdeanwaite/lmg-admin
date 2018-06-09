import gql from "graphql-tag";
import PrincipleFragments from "./PrincipleFragments";

export default gql`
  mutation updatePrincipleMutation($id: ID!, $updates: PrincipleUpdates!) {
    updatePrinciple(id: $id, updates: $updates) {
      id
      doctrineMarkdown
      enabled
      lessonId
      name
      pointsToTeachMarkdown
      reflectPrompts 
      scriptureGroups {
        id
        title
        scriptures {
          id
          link
          text
        }
      }
      teachingMarkdown
      videoRefs {
        title
        link
      }
    }
  }
`;
