import UserService from "../Service/userService";
import {EditUserIProps} from "../Service/userServiceType";
import {protectResolver} from "../users.utils";
export default {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                { firstName, lastName, username, email, password: newPassword}: EditUserIProps,
                { user }
            ) => {
                try {
                    const hashPassword = await UserService.checkUserPassword(newPassword);
                    await UserService.editUser(firstName, lastName, username, email, hashPassword, user);
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