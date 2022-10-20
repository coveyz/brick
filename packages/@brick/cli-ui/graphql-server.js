import http from 'http';
import express from 'express';
import deepmerge from 'deepmerge';
import { PubSub } from 'graphql-subscriptions';
import { ApolloServer, gql } from 'apollo-server-express';

const load = async (file) => {
	const module = await import(file);
	if (module.default) {
		return module.default;
	}
	return module;
};

const processSchema = (typeDefs) => {
	// console.log('processSchema-typeDefs=>', typeDefs);
	if (Array.isArray(typeDefs)) {
		return typeDefs.map(processSchema);
	}
	if (typeof typeDefs === 'string') {
		typeDefs = gql(typeDefs);
	}
	// 删除上传标量（它已经包含在Apollo Server中）
	removeFromSchema(typeDefs, 'ScalarTypeDefinition', 'Upload');

	return typeDefs;
};

// 删除上传标量（它已经包含在Apollo Server中）
const removeFromSchema = (document, kind, name) => {
	const definitions = document.definitions;
	const index = definitions.findIndex((def) => def.kind === kind && def.name.kind === 'Name' && def.name.value === name);
	// console.log('definitions=>', definitions);
	// console.log('definitions-index=>', index);
	if (index !== -1) {
		definitions.splice(index, 1);
	}
};

export default async function (options, cb = null) {
	options = deepmerge(
		{
			integratedEngine: false,
		},
		options
	);
	// console.log('graphql-server-options=>', options);
	const app = new express();
	const httpServer = http.createServer(app);

	//* 自定义文件
	let typeDefs = await load(options.paths.typeDefs);
	const resolvers = await load(options.paths.resolvers); //todo resolvers
	// const context = await load(options.paths.context) // todo context
	// const schemaDirectives = await load(options.paths.schemaDirectives) //todo schemaDirectives

	let pubsub;
	try {
		pubsub = await load(options.paths.pubsub);
	} catch (error) {}

	let dataSource;
	try {
		dataSource = await load(options.paths.dataSource); //todo dataSource
	} catch (error) {}

	// console.log('resolvers=>', resolvers);

	// GraphQL API服务器
	// 实时订阅
	if (!pubsub) pubsub = new PubSub();

	// 自定义服务器
	try {
		const serverModule = await load(options.paths.server);
		serverModule(app);
	} catch (error) {
		console.error('💣💣💣', 'no-file-found');
	}

	typeDefs = processSchema(typeDefs);

	// console.log('typeDefs=>', typeDefs);

	let subscriptionServer;
	let apolloServerOptions = {}; //todo apolloServerOptions
}
