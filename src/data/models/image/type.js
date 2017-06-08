import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql'

import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

// Define our user type, with two string fields; `id` and `name`
export default new GraphQLObjectType({
  name: 'Image',
  description: 'Image object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    type:{
      type: new GraphQLNonNull(GraphQLString)
    },
    fileSize: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    dimensions: {
      type: new GraphQLObjectType({
        name: 'dimensions',
        fields: () => ({
          width: {type: GraphQLInt},
          height: {type: GraphQLInt}
        })
      })
    },
    userUpload: {
      type: new GraphQLNonNull(GraphQLString)
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
  })
});
