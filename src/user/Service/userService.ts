import client from "../../client";
import * as bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import process from "process";
class UserService {

    async sayHello() {
        console.log('Hello world');
    }

    async isExistUser(username, email) {
        const isExistUser = await client.user.findFirst({
            where: {
                OR: [
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            }
        });
        if (isExistUser) {
            throw new Error("이미 유저의 이름 또는 메일이 존재합니다.");
        }
    }

    async createUserAndValidation(firstName, lastName, username, email, password) {
        const hashPassword = await bcrypt.hash(password, 10, null);
        const user = await client.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password: hashPassword
            }
        });
        console.log(user)
        if (!user) {
            return {
                ok: false,
                error: "유저 생성에 실패하였습니다."
            }
        }
    }

    async checkUserPassword(newPassword: string | undefined): Promise<String | null> {
        if (newPassword) {
            return await bcrypt.hash(newPassword, 10, null);
        }
        return null;
    }

    async editUser(firstName, lastName, username, email, hashPassword, bio, user) {
        const newUser = await client.user.update({where: {
                id: user.id,
            }, data: {
                firstName,
                lastName,
                username,
                email,
                bio,
                ...(hashPassword && {password: hashPassword})
            }});
        if (!newUser) {
            return {
                ok: false,
                error: "유저 정보 변경에 실패하였습니다."
            }
        }
        return {
            ok: true,
        }
    }

    async getUser(token: String) {
        if (!token) {
            return null;
        }
        const { id } = await Jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where: { id }});
        if (!user) {
            return null;
        }
        return user;
    }

    async findUser(targetId: number) {
        const user = await client.user.findUnique({
            where: {
                id: targetId
            }
        });

        if (!user) {
            throw new Error("유저를 찾지 못하였습니다.")
        }
    }
}

export default new UserService();