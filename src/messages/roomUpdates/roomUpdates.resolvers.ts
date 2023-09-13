
import pubsub from "../../pubsub";
import {withFilter} from "graphql-subscriptions";
import client from "../../client";
import MessageService from "../service/messageService";

const resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, { user }) => {
                const room = await MessageService.findRoomById(args.id, user.id);
                if (!room) {
                    throw new Error("해당 룸을 찾지 못하였습니다.")
                }
                return withFilter(
                    () => pubsub.asyncIterator("NEW_MESSAGE"),
                    async ({ roomUpdates }, { id }, { user }) => {
                        const room = await MessageService.findRoomById(id, user.id);
                        return !!room;
                    }
                )(root, args, { user });
            }
        }
    }
}

export default resolvers