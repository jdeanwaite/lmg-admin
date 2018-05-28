import gql from "graphql-tag";
import PrincipleFragments from './PrincipleFragments'

export default gql`
  mutation AddPrinciple($name: String!, $lessonId: ID) {
    addPrinciple(name: $name, lessonId: $lessonId) {
      lessonId
      ...PrincipleFull
    }
  }
  ${PrincipleFragments.full}
`;
