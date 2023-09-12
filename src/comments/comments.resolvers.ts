import {Resolvers} from "../index";

const resolvers: Resolvers = {
    Comment: {
        isMine: ({userId}, _, {user}) => {
            if (!user) return false;
            return userId === user.id;
        }
    }
}

export default resolvers;