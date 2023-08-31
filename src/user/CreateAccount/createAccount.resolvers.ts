import {User} from "@prisma/client";
import UserService from "../Service/userService";

export default {

    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password
        }: User) => {
            try {
                await UserService.isExistUser(username, email);
                await UserService.createUserAndValidation(firstName, lastName, username, email, password);
                return {
                    ok: true
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e
                }
            }
        },
    }
}