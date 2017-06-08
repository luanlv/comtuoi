import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql'

// Define our user type, with two string fields; `id` and `name`
export default new GraphQLObjectType({
  name: 'User',
  description: 'User object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  })
})
