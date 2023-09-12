import {Resolvers} from "../../index";
import client from "../../client";

const resolvers: Resolvers = {
    Query: {
        seePhotoLikes: async (_, {id}) => {
            const likes = await client.like.findMany({
                where: {
                    photoId: id
                },
                select: {
                    user: true
                }
            });
            return likes.map((item) => item.user);
        }
    }
}

export default resolvers;