import {protectResolver} from "../../user/users.utils";
import client from "../../client";
import PhotoService from "../Service/photoService";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, caption}, { user }) => {
            const hashtagObj = PhotoService.filterHashtags(caption);

            return client.photo.create({
                data: {
                    file,
                    caption,
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    ...(hashtagObj.length && {
                        hashtags: {
                            connectOrCreate: hashtagObj
                        }
                    })
                }
            })
            // save the photo with the parsed hashtags

            // add the photo to the hashtags
        })
    }
}