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
  seo: {
    type: type,
    args: {
      url: {
        type: GraphQLString
      }
    },
    resolve: model.getByUrl
  },
  allSeo: {
    type: new GraphQLList(type),
    args: {
      filter: {
        type: GraphQLString
      }
    },
    resolve: model.getAllSeo
  },
};
