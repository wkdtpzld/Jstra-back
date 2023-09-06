import UserService from "../Service/userService";
import {EditUserIProps} from "../Service/userServiceType";
import {protectResolver} from "../users.utils";
import {Resolvers} from "../../index";

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectResolver(
             async (
                _,
                { firstName, lastName, username, email, password: newPassword, bio, avatar}: EditUserIProps,
                { user }
            ) => {
                try {
                    const hashPassword = await UserService.checkUserPassword(newPassword);
                    return await UserService.editUser(firstName, lastName, username, email, hashPassword, bio, user);
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