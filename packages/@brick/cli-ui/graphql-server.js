import http from 'http';
import express from 'express';
import deepmerge from 'deepmerge';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';
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

const autoCall = (fn, ...context) => {
	if (typeof fn === 'function') {
		return fn(...context);
	}

	return fn;
};

const defaultValue = (provided, value) => {
	return provided == null ? value : provided;
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
	const resolvers = await load(options.paths.resolvers);
	const schemaDirectives = await load(options.paths.directives);
	const context = await load(options.paths.context);

	// console.log('context=>', context);

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

	let subscriptionServer;

	//apolloServerOptions
	let apolloServerOptions = {
		typeDefs,
		resolvers,
		schemaDirectives,
		dataSource,
		tracing: true,
		cache: 'bounded',
		cacheControl: true,
		engine: !options.integratedEngine,
		// WebSocket中 Resolvers 上下文
		context: async ({ req, connect }) => {
			console.log('apolloServer-options-context');
			let contextData;

			try {
				if (connect) {
					contextData = await autoCall(context, { connect });
				} else {
					contextData = await autoCall(context, { req });
				}
			} catch (error) {
				console.error('apolloServer-options-context-error=>', error);
				throw error;
			}

			contextData = Object.assign({}, contextData);
			return contextData;
		},
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	};

	// 自动模拟
	if (options.enableMocks) {
		console.log('todo-enableMocks');
	}

	// Apollo Engine
	if (options.enableEngine && options.integratedEngine) {
		console.log('todo-Apollo Engine');
	} else {
		apolloServerOptions['engine'] = false;
	}

	//  最终 apolloServerOptions
	apolloServerOptions = deepmerge(apolloServerOptions, defaultValue(options['serverOptions'], {}));

	const server = new ApolloServer(apolloServerOptions);

	const schema = makeExecutableSchema({
		typeDefs: apolloServerOptions['typeDefs'],
		resolvers: apolloServerOptions['resolvers'],
		schemaDirectives: apolloServerOptions['schemaDirectives'],
	});

	subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
			onConnect: async (connection, websocket) => {
				console.log('graphql-subscriptionServer->');
				let contextData = {};

				try {
					contextData = await autoCall(context, {
						connection,
						websocket,
					});
					contextData = Object.assign({}, contextData, { pubsub });
				} catch (error) {
					console.error('💣graphqlServer-subscriptionServer', error);
					throw error;
				}

				return contextData;
			},
		},
		{
			server: httpServer,
			path: options['subscriptionsPath'],
		}
	);

	await server.start();

	// Express Middleware
	server.applyMiddleware({
		app,
		path: options['graphqlPath'],
		cors: options['cors'],
	});

	// Start server
	httpServer.setTimeout(options['timeout']);

	httpServer.listen(
		{
			host: options['host'] ?? 'localhost',
			port: options['port'],
		},
		() => {
			if (!options['quiet']) {
				console.log('httpServer-listen-!quiet');
			}

			cb && cb();
		}
	);

	// cli 处理http请求
	return {
		apolloServer: server,
		httpServer,
	};
}
