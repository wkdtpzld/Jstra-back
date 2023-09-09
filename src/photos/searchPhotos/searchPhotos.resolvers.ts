import {Resolvers} from "../../index";
import client from "../../client";

const resolvers: Resolvers = {
    Query: {
        searchPhotos: (_, {keyword, cursor}) => {
            return client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword
                    }
                },
                take: 5,
                skip: cursor ? 0 : 1,
                ...(cursor && {cursor: {id : cursor}})
            })
        }
    }
}

export default resolvers;