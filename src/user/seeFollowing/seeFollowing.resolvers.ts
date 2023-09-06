import UserService from "../Service/userService";
import client from "../../client";

interface ISeeFollowingProps {
    userId: number
    page: number
}

const resolvers = {
    Query: {
        seeFollowing: async (_, { userId, cursor }: ISeeFollowingProps) => {
            await UserService.findUser(userId);

            const following = await client.user
                .findUnique({ where: { id: userId}})
                .following({
                    take: 5,
                    skip: cursor ? 1 : 0,
                    ...(cursor && {cursor: {id: cursor}})
                });

            return {
                ok: true,
                following
            }
        }
    }
}

export default resolvers;