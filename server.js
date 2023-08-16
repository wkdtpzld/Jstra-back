import {gql, ApolloServer} from "apollo-server"

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => 'bwbw',
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(() => console.log("server is running on http://localhost:4000/"));