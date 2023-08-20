require("dotenv").config();
import schema from "./src/schema.js";
import {ApolloServer} from "apollo-server"


const index = new ApolloServer({
    schema
});

const PORT = process.env.PORT;
index.listen().then(() => console.log(`server is running on http://localhost:${PORT}/`));