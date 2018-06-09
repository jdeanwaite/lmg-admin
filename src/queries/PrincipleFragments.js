import gql from 'graphql-tag';

export default {
  full: gql`
    fragment PrincipleFull on Principle {
      id
      enabled
      name
      doctrineMarkdown
      teachingMarkdown
      pointsToTeachMarkdown
      reflectPrompts
      videoRefs {
        title
        link
      }
      scriptureGroups {
        id
        title
        scriptures {
          id
          text
          link
        }
      }
    }
  `
}
