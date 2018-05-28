import gql from 'graphql-tag';
import PrincipleFragments from './PrincipleFragments'

export default gql`
  query AllLessons {
    allLessons {
      id
      name
      principles {
        ...PrincipleFull
      }
    }
  }
  ${PrincipleFragments.full}
`;
