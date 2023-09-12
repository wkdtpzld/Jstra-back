import {Resolvers} from "../index";
import client from "../client";

const resolvers: Resolvers = {
    Room: {
        users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
        messages: ({ id }) =>
            client.message.findMany({
                where: {
                    roomId: id,
                },
            }),
        unreadTotal: ({ id }, _, { user }) => {
            if (!user) {
                return 0;
            }
            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: user.id
                        }
                    }
                }
            })
        },
    },
    Message: {
        user: ({ id }) => client.message.findUnique({
            where: { id }
        }).user()
    }
}

export default resolvers;