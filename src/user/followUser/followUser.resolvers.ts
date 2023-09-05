import {protectResolver} from "../users.utils";
import {User} from "@prisma/client";
import client from "../../client";
import UserService from "../Service/userService";

export default {
    Mutation: {
        followUser: protectResolver(async(_, { targetId }: {targetId: number}, { user }: {user: User} ) => {

            try {
                await UserService.findUser(targetId);
                await client.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            connect: {
                                id: targetId
                            }
                        }
                    }
                });
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