import client from "../../client";

class UserService {

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
}

export default new UserService();