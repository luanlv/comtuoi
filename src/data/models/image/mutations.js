import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import userType from './type';
import user from './schema';

export default {
  addUser:{
    type:userType,
    args: {
      name:{
        name:'name',
        type:new GraphQLNonNull(GraphQLString)
      },
      email:{
        name:'email',
        type: new GraphQLNonNull(GraphQLString)
      },
      tel: {
        name:'tel',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: user.addUser
  },
  updateUser:{
    type:userType,
    args: {
      id:{
        type: GraphQLID
      },
      name:{
        name:'name',
        type: GraphQLString
      },
      email:{
        name:'email',
        type: GraphQLString
      },
      tel: {
        name:'tel',
        type: GraphQLString
      }
    },
    resolve: user.updateUser
  }
};
