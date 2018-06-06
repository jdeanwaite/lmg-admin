import gql from "graphql-tag";

export default gql`
  mutation AddPrinciple($name: String!) {
    addLesson(name: $name) {
      id
      name
      principles {
        id
      }
    }
  }
`;
