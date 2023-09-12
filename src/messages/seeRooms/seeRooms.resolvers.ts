import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import client from "../../client";

const resolvers: Resolvers = {
    Query: {
        seeRooms: protectResolver(async (_, __, { user }) => {
            return client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: user.id
                        }
                    }
                }
            });
        })
    }
}

export default resolvers;