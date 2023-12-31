import {protectResolver} from "../users.utils";
import client from "../../client";
import UserService from "../Service/userService";
import {Resolvers} from "../../index";

const resolvers: Resolvers = {
    Mutation: {
        unFollowUser: protectResolver(async (_, {targetId}, { user }) => {
            try {
                await UserService.findUser(targetId);
                await client.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            disconnect: {
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

export default resolvers