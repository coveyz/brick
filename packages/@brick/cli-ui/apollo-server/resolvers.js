import deepmerge from 'deepmerge';
import { GraphQLJSON } from 'graphql-type-json';
import cwd from './connectors/cwd.js';

const resolvers = [
	{
		JSON: GraphQLJSON,
		Query: {
			cwd: () => cwd.get()
		},
	},
];

export default deepmerge(null, resolvers);
