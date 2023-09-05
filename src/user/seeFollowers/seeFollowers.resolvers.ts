import client from "../../client";
import UserService from "../Service/userService";

interface ISeeFollowersProps {
    userId: number
    page: number
}

export default {
    Query: {
        seeFollowers: async (_, {userId, cursor}: ISeeFollowersProps) => {
            await UserService.findUser(userId);
            const followers = await client.user
                .findUnique({ where: { id: userId}})
                .followers({
                    take: 5,
                    skip: cursor ? 1 : 0,
                    ...(cursor && {cursor: {id: cursor}})
                });

            return {
                ok: true,
                followers,
            }
        }
    }
}