import {User} from "@prisma/client";
import client from "../../client";

const resolvers = {
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

export default resolvers;