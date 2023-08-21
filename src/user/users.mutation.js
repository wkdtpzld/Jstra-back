import client from "../client.js";
import * as bcrypt from "bcrypt";
import UserService from "./Service/userService";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password
        }) => {
            try {
                await UserService.isExistUser(username, email);
                const hashPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        password: hashPassword
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
}