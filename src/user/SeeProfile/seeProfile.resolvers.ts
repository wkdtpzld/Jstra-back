import {User} from "@prisma/client";
import client from "../../client";

export default {
    Query: {
        seeProfile: (_, {username}: User) => {
            return client.user.findUnique({
                where: {
                    username
                }
            })
        }
    },
}