import client from "../client";
import {Resolvers} from "../index";
import {Hashtag} from "@prisma/client";

const resolvers: Resolvers = {
    Photo: {
        user: ({userId}) => {
            return client.user.findUnique({ where: { id: userId }});
        },
        hashtags: ({id}) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id
                        }
                    }
                }
            })
        },
        likes: ({id}) => {
            return client.like.count({
                where: {
                    photoId: id
                }
            })
        }
    },
    Hashtag: {
        totalPhotos: ({id}: Hashtag) => {
            return client.photo.count({where: { hashtags: { some: { id }}}});
        },
        photos: ({id}: Hashtag, { cursor }) => {
            return client.hashtag.findUnique(
                { where: { id }}
            ).photos({
                take: 5,
                skip: cursor ? 1 : 0,
                ...(cursor && {cursor: {id: cursor}})
            })
        }
    }
}

export default resolvers