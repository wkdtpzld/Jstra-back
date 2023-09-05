import {gql} from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        followers: [User]
        following: [User]
        createdAt: String!
        updatedAt: String!
    }
    type DefaultResponse {
        ok: Boolean!
        error: String
    }
`;