import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import client from "../../client";
import CommentService from "../Service/commentService";

const resolvers: Resolvers = {
    Mutation: {
        editComment: protectResolver(async (_, { id, payload }, { user }) => {
            try {
                const comment = await CommentService.checkComment(id);
                if (comment.userId !== user.id) {
                    return {
                        ok: false,
                        error: "인가되지 않은 행동입니다."
                    }
                }
                await client.comment.update({
                    where: {id},
                    data: {payload}
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

export default resolvers;