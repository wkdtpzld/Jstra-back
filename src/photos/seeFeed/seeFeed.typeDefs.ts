import {gql} from "apollo-server";

export default gql`
    type Query {
        seeFeed(cursor: Int): [Photo]
    }
`;