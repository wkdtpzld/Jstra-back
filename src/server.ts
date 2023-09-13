import {createServer} from "http";
import express from "express";
import {resolvers, typeDefs} from "./schema";
import { ApolloServer } from "apollo-server-express";
import UserService from "./user/Service/userService";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
require("dotenv").config();
const PORT = process.env.PORT;

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
        return {
            user: await UserService.getUser(req.headers['jwt-token']),
        };
    },
});

const app = express();
app.use("/static", express.static("uploads"));
const httpServer = createServer(app);
// app.use(logger("tiny"));

server.start().then(async res => {
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app, path : '/'});
    app.listen({ port:PORT }, () =>
        console.log(`🚀Server is running on http://localhost:${PORT} ✅`)
    );
});