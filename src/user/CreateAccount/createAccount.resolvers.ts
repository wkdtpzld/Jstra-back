import {User} from "@prisma/client";
import UserService from "../Service/userService";
import {Resolvers} from "../../index";

const resolvers: Resolvers = {

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

export default resolvers;