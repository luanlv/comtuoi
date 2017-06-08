import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} from 'graphql'

import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

// Define our user type, with two string fields; `id` and `name`
import GraphQLJSON from 'graphql-type-json';

export default new GraphQLObjectType({
  name: 'Post',
  description: 'Post object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    category: {
      type: new GraphQLNonNull(GraphQLString)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    public: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    coverUrl: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    body: {
      type: new GraphQLNonNull(GraphQLString)
    },
    view: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    tags: {
      type: new GraphQLList(GraphQLJSON)
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
  })
});
