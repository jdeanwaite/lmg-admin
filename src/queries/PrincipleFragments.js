import gql from 'graphql-tag';

export default {
  full: gql`
    fragment PrincipleFull on Principle {
      id
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
        title
        scriptures {
          displayText
          book
          subBook
          chapter
          verse
        }
      }
    }
  `
}
