import client from "../client.js";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password
        }) => {
            console.log('??')
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
            console.log(isExistUser)
        }
    }
}