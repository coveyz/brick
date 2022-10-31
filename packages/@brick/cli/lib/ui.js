import shortid from 'shortid';
import { createRequire } from 'module';

import { openBrowser, log } from '@brick/cli-shared-utils';
import { portfinder, server } from '@brick/cli-ui/server.js';
import { setNotificationCallback } from '@brick/cli-ui/apollo-server/util/notification.js';

const requirePath = createRequire(import.meta.url);

// cors 验证
const simpleCorsValidation = (alloweHost) => {
	console.log('ui-simpleCorsValidation=>', alloweHost);
	return function (req, socket) {
		const { host, origin } = req.header;
		// console.log('host=>', host, 'origin=>', origin);
		const sageOrigins = [host, alloweHost, 'localhost'];

		if (!origin || !sageOrigins.includes(new URL(origin).hostname)) {
			socket.destory();
		}
	};
};

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
			directives: requirePath.resolve('@brick/cli-ui/apollo-server/directives.js'),
			context: requirePath.resolve('@brick/cli-ui/apollo-server/context.js'),
		},
	};

	const { httpServer } = await server(opts, () => {
		// 重新 设置环境
		if (typeof nodeEnv === 'undefined') {
			delete process.env.NODE_ENV;
		} else {
			process.env.NODE_ENV = nodeEnv;
		}

		const url = `http://${host}:${port}`;
		console.log('url=.', url);
		if (!options['quiet']) log(`🌠 Ready on ${url}`);
		setNotificationCallback(() => openBrowser(url));
		openBrowser(url);
	});

	httpServer.on('upgrade', simpleCorsValidation(host));
}

export default (...args) => {
	// module.exports = (...args) => {
	return ui(...args).catch((error) => {
		console.log('ui-catch-error', error);

		if (!process.env.VUE_CLI_TEST) {
			process.exit(1);
		}
	});
};
