import {protectResolver} from "../../user/users.utils";
import client from "../../client";
import PhotoService from "../Service/photoService";
import {uploadPhoto} from "../../utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, caption}, { user }) => {
            const hashtagObj = PhotoService.processHashtags(caption);
            const fileUrl = await uploadPhoto(file, user.id, "uploads");
            return client.photo.create({
                data: {
                    file: fileUrl,
                    caption,
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    ...(hashtagObj && hashtagObj.length && {
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