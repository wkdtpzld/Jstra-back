import UserService from "../Service/userService";
import {EditUserIProps} from "../Service/userServiceType";
import {protectResolver} from "../users.utils";

export default {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                { firstName, lastName, username, email, password: newPassword, bio, avatar}: EditUserIProps,
                { user }
            ) => {
                try {
                    console.log(avatar)
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