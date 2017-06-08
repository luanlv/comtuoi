import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import GraphQLJSON from 'graphql-type-json';

import type from './type';
import model from './schema';




export default {
  newPost:{
    type: type,

    args: {
      category:{
        name:'category',
        type:new GraphQLNonNull(GraphQLString)
      },
      slug:{
        name:'slug',
        type: new GraphQLNonNull(GraphQLString)
      },
      title:{
        name:'title',
        type: new GraphQLNonNull(GraphQLString)
      },
      coverUrl:{
        name:'coverUrl',
        type: new GraphQLNonNull(GraphQLString)
      },
      description:{
        name:'description',
        type: new GraphQLNonNull(GraphQLString)
      },
      body:{
        name:'body',
        type: new GraphQLNonNull(GraphQLString)
      },
      tags:{
        name:'slug',
        type: new GraphQLList(GraphQLJSON)
      },
    },
    resolve: model.newPost
  }
};
