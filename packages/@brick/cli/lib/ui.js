import { openBrowser, log } from '@brick/cli-shared-utils';
import { portfinder, server } from '@brick/cli-ui/server.js';
import shortid from 'shortid';
import { createRequire } from 'module';
const requirePath = createRequire(import.meta.url);

async function ui(options = {}, context = process.cwd) {
	const host = options.host || 'localhost';

	let port = options.port;
	if (!port) {
		port = await portfinder.getPortPromise();
	}

	// Config
	process.env.VUE_BRICK_CLI_UI_URL = '';

	// 优化 express
	const nodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = 'production';

	if (!process.env.VUE_BRICK_CLI_IPC) {
		// 防止 IPC 冲突
		process.env.VUE_BRICK_CLI_IPC = `brick-cli-${shortid}`;
	}

	if (!options.quiet) log(`🚀  Starting GUI...`);

	// 配置文件
	const opts = {
		host,
		port,
		graphqlPath: '/graphql',
		subscriptionsPath: '/graphql',
		enableMocks: false,
		enableEngine: false,
		cors: {
			host,
		},
		timeout: 1000000,
		quiet: true,
		paths: {
			typeDefs: requirePath.resolve('@brick/cli-ui/apollo-server/type-defs.js'),
      resolvers: requirePath.resolve('@brick/cli-ui/apollo-server/resolvers.js'),
      pubsub: requirePath.resolve('@brick/cli-ui/apollo-server/pubsub.js'),
      server: requirePath.resolve('@brick/cli-ui/apollo-server/server.js'),
			//todo ...
		},
	};

	const serverCallbak = await server(opts, () => {});

	console.log('serverCallbak=>', serverCallbak);
}

export default (...args) => {
	// module.exports = (...args) => {
	return ui(...args);
};
