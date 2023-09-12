import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import client from "../../client";

const resolvers: Resolvers = {
    Query: {
        seeRoom: protectResolver(async(_, { id }, { user }) => {
            return client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: user.id
                        }
                    }
                },
            })
        })
    }
}

export default resolvers;

