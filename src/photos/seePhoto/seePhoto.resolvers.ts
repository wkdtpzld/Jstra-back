import {Resolvers} from "../../index";
import client from "../../client";

const resolvers: Resolvers = {
    Query: {
        seePhoto: (_, { id }) => {
            return client.photo.findUnique({
                where: {
                    id
                }
            })
        }
    }
}

export default resolvers;