import {User} from "@prisma/client";
import client from "../../client";
import * as Jwt from "jsonwebtoken";
import process from "process";
import * as bcrypt from "bcrypt";

const resolvers = {
    Mutation : {
        login: async(_, { username, password }) => {
            // find user with args.username
            const user: Promise<User> = await client.user.findUnique({ where: {username} });
            if (!user) {
                return {
                    ok: false,
                    error: "유저를 찾을 수 없습니다.",
                }
            }
            const passwordOk = await bcrypt.compare(password, (await user).password, null);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "비밀번호가 일치하지 않습니다."
                }
            }

            const token = Jwt.sign({id: (await user).id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token
            }
        }
    }
}

export default resolvers;