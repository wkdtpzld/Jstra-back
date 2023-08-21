import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeResolvers} from "@graphql-tools/merge/merge-resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema/makeExecutableSchema";
import {mergeTypeDefs} from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutation}.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;