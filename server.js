import {gql, ApolloServer} from "apollo-server"

const typeDefs = gql`
    type Movie {
        title: String
        year: Int
    },
    type Query {
        movies: [Movie]
        movie: Movie
    },
    type Mutation {
        createMovie(title: String!): Boolean
        deleteMovie(title: String!): Boolean
    }
`

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({"title": "Hello", year: 2021})
    },
    Mutation: {
        createMovie: (_, args) => {
            console.log(args);
            return true;
        },
        deleteMovie: (_, args) => {
            console.log(args);
            return true;
        },
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(() => console.log("server is running on http://localhost:4000/"));