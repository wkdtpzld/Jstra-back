import {protectResolver} from "../../user/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, cation}, { user }) => {
            if (cation) {
                // parse cation

                // get or create Hashtags
            }

            // save the photo with the parsed hashtags

            // add the photo to the hashtags
        })
    }
}