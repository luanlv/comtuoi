import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

import type from './type'
import model from './schema'

export default {
  listImage: {
    type: new GraphQLList(type),
    args: {
      num: {
        type: GraphQLInt
      },
      time: {
        type: GraphQLDateTime
      },
      filter: {
        type: GraphQLString
      }
    },
    resolve: model.getListImageByTime
  },

};
