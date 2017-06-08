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
  name: 'Seo',
  description: 'Seo object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    url: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    og_title: {
      type: GraphQLString
    },
    og_image: {
      type: GraphQLString
    },
    og_description: {
      type: GraphQLString
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
  })
});
