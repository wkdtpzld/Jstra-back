import client from "../client";

export default {
    User: {
        totalFollowing: async ({id}) => (
            await client.user.count({
                where: {
                    following: {
                        some: {
                            id
                        }
                    }
                }
            })
        ),
        totalFollowers: async ({id}) => (
            await client.user.count({
                where: {
                    following: {
                        some: {
                            id
                        }
                    }
                }
            })
        ),
        isMe: async ({id}, _, { user }) => {
            if (!user) {
                return false;
            }
            return id === user.id
        },
        isFollowing: async ({id}, _, { user }) => {
            if (!user) {
                return false;
            }
            const exists = await client.user.findUnique({
                where: { username: user.username }
            }).following({where: { id } });

            return exists?.length !== 0;
        }
    }
}