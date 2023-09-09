import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import PhotoService from "../Service/photoService";
import client from "../../client";
import {Like, Photo} from "@prisma/client";

const resolvers: Resolvers = {
    Mutation: {
        toggleLike: protectResolver(async (_, { id }, { user }) => {
            try {
                const photo = await PhotoService.checkPhoto(id) as Photo;
                const like = await client.like.findUnique({
                    where: {
                        photoId_userId: {
                            userId: user.id,
                            photoId: id
                        }
                    }
                }) as Like;
                await PhotoService.likeStateUpdate({like, user, photo, id});

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