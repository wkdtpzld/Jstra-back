import {protectResolver} from "../../user/users.utils";
import client from "../../client";
import {Prisma} from "@prisma/client";

export default {
    Query: {
        seeFeed: protectResolver(async (_, { cursor }, { user }) => {
            try {
                return await client.photo.findMany({
                    where: {
                        OR: [
                            {
                                user: {
                                    followers: {
                                        some: {
                                            id: user.id,
                                        },
                                    },
                                },
                            },
                            {
                                userId: user.id,
                            },
                        ],
                    },
                    orderBy: {
                        createdAt: Prisma.SortOrder.desc,
                    },
                    take: 5,
                    skip: cursor ? 1 : 0,
                    ...(cursor && {cursor: { id : cursor }})
                });

            } catch (e) {
                return {
                    ok: false,
                    error: e.message
                }
            }
        }),
    },
};