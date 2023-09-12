import {gql} from "apollo-server";

export default gql`
    type Message {
        id: Int!
        payload: String!
        user: User!
        room: Room!
        read: Boolean!
        createAt: String!
        updatedAt: String!
    }
    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        unreadTotal: Int!
        createAt: String!
        updatedAt: String!
    }
`