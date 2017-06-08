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
  name: 'Order',
  description: 'Order object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString)
    },
    address: {
      type: new GraphQLNonNull(GraphQLString)
    },
    product: {
      type: new GraphQLNonNull(GraphQLString)
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLString)
    },
    done: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
  })
});
