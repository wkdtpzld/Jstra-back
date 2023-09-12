import {Resolvers} from "../../index";
import {protectResolver} from "../../user/users.utils";
import PhotoService from "../Service/photoService";
import client from "../../client";

const resolvers: Resolvers = {
    Mutation: {
        deletePhoto: protectResolver(async (_, {id}, {user}) => {
            try {
                const photo = await PhotoService.checkPhoto(id);
                if (photo.userId !== user.id) {
                    return {
                        ok: false,
                        error: "인가되지 않은 유저입니다."
                    }
                }
                await client.photo.delete({
                    where: {
                        id
                    }
                });
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