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
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
        photos(cursor: Int): [Photo]
        createdAt: String!
        updatedAt: String!
    }
    type DefaultResponse {
        ok: Boolean!
        error: String
    }
`;