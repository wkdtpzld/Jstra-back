import client from "../../client";
import {Comment} from "@prisma/client";

class CommentService {
    async checkComment(id: number): Promise<Comment> {
        const comment = await client.comment.findUnique({
            where: {
                id
            },
            select: {
                userId: true
            }
        });

        if (!comment) {
            throw new Error("해당 댓글을 찾지 못하였습니다.")
        }

        return comment;
    }
}

export default new CommentService();