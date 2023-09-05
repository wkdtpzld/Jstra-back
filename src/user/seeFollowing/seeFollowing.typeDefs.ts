import {gql} from "apollo-server";

export default gql`
    type SeeFollowingResult {
        ok: Boolean!
        error: String
        following: [User]
    }
    type Query {
        seeFollowing(userId: Int!, cursor: Int): SeeFollowingResult
    }
`