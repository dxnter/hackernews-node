const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Feed = require('./resolvers/Feed');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const AuthPayload = require('./resolvers/AuthPayload');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  AuthPayload,
  Feed,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/danny-foster-e1dd25/hackernews/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
