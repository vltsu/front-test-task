import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInputObjectType,
} from 'graphql';
import {
  connectionDefinitions,
  nodeDefinitions,
  fromGlobalId,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

const newsArray = [
  {
    id: 1,
    name: 'First news',
  },
];

const News = new GraphQLObjectType({
  name: 'News',
  fields: {
    name: { type: GraphQLString },
  },
});

const { connectionType, edgeType } =connectionDefinitions({
  name: 'newsConnection',
  nodeType: News,
});

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    news: {
      type: connectionType,
      args: connectionArgs,
      resolve: (args) => {
        return connectionFromArray(newsArray, args)
      }
    },
  },
});

const { nodeInterface, nodeField } = nodeDefinitions(
(globalId, { rootValue }) => {
  const {type, id} = fromGlobalId(globalId);

  if (id === 'viewer') {
    return rootValue;
  }

  return rootValue;
},
(obj) => {
  return Viewer;
});

const NewsInput = new GraphQLInputObjectType({
  name: 'NewsInput',
  fields: {
    name: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      node: nodeField,
      viewer: {
        type: Viewer,
        resolve: (_, args, {rootValue}) => rootValue
      },
    },
  })
});