import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import UserService from "../../user/Service/userService";
import client from "../../client";
import {Room} from "@prisma/client";
import MessageService from "../service/messageService";
import pubsub from "../../pubsub";

const resolvers: Resolvers = {
    Mutation: {
        sendMessage: protectResolver(async (_, {payload, roomId, userId}, { user }) => {
            try {
                const room = await MessageService.createOrFindRoom({roomId, userId, user});
                const message = room && await client.message.create({
                    data: {
                        payload,
                        room: {
                            connect: {
                                id: room.id
                            }
                        },
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                });
                pubsub.publish("NEW_MESSAGE", { roomUpdates: { ...message } })
                return {
                    ok: true
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e.message
                }
            }
        })
    }
}

export default resolvers;