import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import type from './type'
import model from './schema'

export default {
  users: {
    type: new GraphQLList(type),
    resolve: model.getListOfUsers
  }
};
