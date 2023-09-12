import {Resolvers} from "../../index";
import client from "../../client";
import {Prisma} from "@prisma/client";

const resolvers: Resolvers = {
    Query: {
        seePhotoComments: (_, { id, cursor }) => {
           return client.comment.findMany({
               where: {
                   photoId: id,
               },
               orderBy: {
                   createdAt: Prisma.SortOrder.desc
               },
               take: 5,
               skip: cursor ? 1 : 0,
               ...(cursor && ({cursor: { id: cursor }}))
           })
        }
    }
}

export default resolvers;