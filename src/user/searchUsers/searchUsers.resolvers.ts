import client from "../../client";

const resolvers = {
    Query: {
        searchUsers: async (_, { keyword, cursor }) => {
            return client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    }
                },
                take: 10,
                skip: cursor ? 1 : 0,
                ...(cursor && {cursor: {id: cursor}})
            });
        }
    }
}

export default resolvers;