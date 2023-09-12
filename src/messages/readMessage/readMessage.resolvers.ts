import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import client from "../../client";

const resolvers: Resolvers = {
    Mutation: {
        readMessage: protectResolver(async (_, { id }, { user }) => {
            const message = await client.message.findFirst({
                where: {
                    id,
                    userId: {
                        not: user.id
                    },
                    room: {
                        users: {
                            some: {
                                id: user.id
                            }
                        }
                    }
                },
                select: {
                    id: true
                }
            });
            if (!message) {
                return {
                    ok: false,
                    error: "메세지를 찾지 못하였습니다."
                }
            }

            await client.message.update({
                where: {
                    id,
                },
                data: {
                    read: true
                }
            });

            return {
                ok: true
            }
        })
    }
};

export default resolvers;