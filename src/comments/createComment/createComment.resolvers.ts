import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import PhotoService from "../../photos/Service/photoService";
import client from "../../client";

const resolvers: Resolvers = {
    Mutation: {
        createComment: protectResolver(async (_, {photoId, payload}, { user }) => {
            try {
                await PhotoService.checkPhoto(photoId);

                await client.comment.create({
                    data: {
                        payload,
                        photo: {
                            connect: {
                                id: photoId
                            }
                        },
                        user: {
                            connect: {
                                id: user.id
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

export default resolvers;