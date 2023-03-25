import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { users, posts, comments } from "./data.js";
// A schema defines the "shape" of queries, the queryable fields that are executed against your data.
const typeDefs = `#graphql
  type User {
    id: ID
    fullName: String
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID
    title: String
    user_id: ID
    user: User
    comments: [Comment!]!
  }

  type Comment {
    id: ID
    text: String
    post_id: ID
    user: User!
    post: Post!
  }

  type Query {
    users: [User]
    user(id: ID): User

    posts: [Post]
    post(id: ID): Post

    comments: [Comment]
    comment(id: ID): Comment
  }
`;
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find((user) => user.id === args.id),
        posts: () => posts,
        post: (parent, args) => posts.find((post) => post.id === args.id),
        comments: () => comments,
        comment: (parent, args) => comments.find((comment) => comment.id === args.id),
    },
    User: {
        posts: (parent) => posts.filter((post) => post.user_id === parent.id),
        comments: (parent) => comments.filter((comment) => comment.user_id === parent.id),
    },
    Post: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        comments: (parent) => comments.filter((comment) => comment.post_id === parent.id),
    },
    Comment: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        post: (parent) => posts.find((post) => post.id === parent.post_id),
    },
};
// The ApolloServer constructor requires your schema definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Apollo server ready at: ${url}`);
