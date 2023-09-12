import UserService from "../Service/userService";
import {EditUserIProps} from "../Service/userServiceType";
import {protectResolver} from "../users.utils";
import {Resolvers} from "../../index";
import {uploadPhoto} from "../../utils";

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectResolver(
             async (
                _,
                { firstName, lastName, username, email, password: newPassword, bio, avatar}: EditUserIProps,
                { user }
            ) => {
                 let avatarUrl = null;
                try {
                    if (avatar) {
                        avatarUrl = await uploadPhoto(avatar, user.id, "avatar");
                    }
                    const hashPassword = await UserService.checkUserPassword(newPassword);
                    return await UserService.editUser(firstName, lastName, username, email, hashPassword, bio, user, avatarUrl);
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message
                    }
                }
            }
        )
    }
}

export default resolvers;