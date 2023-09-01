import UserService from "./src/user/Service/userService";

require("dotenv").config();
import schema from "./src/schema.js";
import {ApolloServer} from "apollo-server"


const index = new ApolloServer({
    schema,
    context: (async ({req}) => {
        return {
            user: await UserService.getUser(req.headers["jwt-token"]),
        }
    })
});

const PORT = process.env.PORT;
index.listen().then(() => console.log(`server is running on http://localhost:${PORT}/`));