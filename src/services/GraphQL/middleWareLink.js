import { ApolloLink } from '@apollo/client';
function omitDeep(obj, property) {
  return JSON.parse(JSON.stringify(obj), (key, value) => (key === property ? undefined : value));
}
// Strip __typename from variables
const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    // eslint-disable-next-line no-param-reassign
    operation.variables = omitDeep(operation.variables, '__typename');
  }
  return forward(operation);
});
export default middleWareLink;