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
export default new GraphQLObjectType({
  name: 'Setting',
  description: 'Setting object',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    ssr: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    css: {
      type: GraphQLString
    },
    scriptTop: {
      type: GraphQLString
    },
    adminId: {
      type: GraphQLString
    },
    emailAdmin: {
      type: GraphQLString
    },
    scriptBottom: {
      type: GraphQLString
    },
  })
});
