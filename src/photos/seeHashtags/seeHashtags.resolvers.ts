import {Resolvers} from "../../index";
import client from "../../client";

interface IHashTagProps {
    hashtag: String
    page?: Number
}

const resolvers: Resolvers = {
    Query: {
        seeHashtag: (_, {hashtag}: IHashTagProps) => {
            return client.hashtag.findUnique({
                where: {hashtag}
            });
        }
    }
}

export default resolvers;