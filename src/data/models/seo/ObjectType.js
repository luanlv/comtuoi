import { GraphQLScalarType } from 'graphql/type';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

var ObjectType = new GraphQLScalarType({
  name: 'ObjectType',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    return value;
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.OBJECT) {
      throw new GraphQLError("Query error: Can only parse object but got a: " + ast.kind, [ast]);
    }
    return ast.value;
  }
});

export default ObjectType
