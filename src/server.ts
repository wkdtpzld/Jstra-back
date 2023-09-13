import {createServer, Server} from "http";
import express, {Express} from "express";
import {ApolloServer, ExpressContext} from "apollo-server-express";
import UserService from "./user/Service/userService";
import { execute, subscribe } from "graphql";
import { ConnectionContext, SubscriptionServer } from "subscriptions-transport-ws";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import schema from "./schema";
require("dotenv").config();

interface ConnectionParams {
    token?: string;
    "content-type"?: string;
}

const startServer = async (): Promise<void> => {
    const app: Express = express();
    app.use(graphqlUploadExpress());
    app.use("/uploads", express.static("uploads"));

    const httpServer: Server = createServer(app);
    const subscriptionServer: SubscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            async onConnect({ token }: ConnectionParams, webSocket: any, context: ConnectionContext) {
                if (token === undefined) {
                    throw new Error();
                }
                const user = await UserService.getUser(token);
                return { user };
            },
            onDisconnect(webSocket: any, context: ConnectionContext) {},
        },
        { server: httpServer, path: "/graphql" }
    );
    const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const user = await UserService.getUser(req.headers.token);
            return { user };
        },
        introspection: true,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        },
                    };
                },
            },
        ],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    httpServer.listen(process.env.PORT, () => console.log(`🚀 Server: http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`));
};

startServer();