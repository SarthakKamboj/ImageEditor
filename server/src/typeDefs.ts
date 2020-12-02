import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type File {
        id: ID!
        filename: String!
        mimetype: String!
        encoding: String!
        path: String!
    }

    type Query {
        files: [File]
    }

    type Mutation {
        uploadFile(file: Upload!): File
    }
`;
