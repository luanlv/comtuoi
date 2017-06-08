import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
  } from 'graphql';

import type from './type';
import model from './schema';

export default {
  update:{
    type: type,
    args: {
      ssr:{
        type:GraphQLBoolean
      }
    },
    resolve: model.update
  }
};
