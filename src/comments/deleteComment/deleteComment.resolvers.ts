import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import CommentService from "../Service/commentService";
import client from "../../client";

const resolvers: Resolvers = {
    Mutation: {
        deleteComment: protectResolver(
            async (_, { id }, { user }) => {
                try {
                    const comment = await CommentService.checkComment(id);
                    if (comment.userId !== user.id) {
                        return {
                            ok: false,
                            error: "인가되지 않은 유저입니다."
                        }
                    }
                    await client.comment.delete({where: { id }});
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message
                    }
                }

            }
        )
    }
}

export default resolvers;