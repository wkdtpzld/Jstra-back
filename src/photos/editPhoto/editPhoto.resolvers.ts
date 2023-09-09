import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import PhotoService from "../Service/photoService";
import client from "../../client";
import {Photo} from "@prisma/client";

const resolvers: Resolvers = {
    Mutation: {
        editPhoto: protectResolver(async (_, {id, caption}, { user }) => {
            try {
                const oldPhoto: (Photo & { hashtags: { hashtag: string }[] }) | null = await PhotoService.checkPhoto(id, user);
                const newHashtags = PhotoService.processHashtags(caption);

                const newPhoto = await client.photo.update({
                    where: {
                        id
                    },
                    data: {
                        caption,
                        hashtags: {
                            disconnect: oldPhoto?.hashtags,
                            connectOrCreate: [...newHashtags]
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

export default resolvers;