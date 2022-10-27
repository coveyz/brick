import gql from 'graphql-tag';

const typeDefs = [gql`
  scalar JSON
  type Query {
    cwd: String!
  }
`];

//todo Load types in './schema'

export default typeDefs;
