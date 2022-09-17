import { openBrowser, log } from '@brick/cli-shared-utils';
import { portfinder, server } from '@brick/cli-ui/server.js';
import shortid from 'shortid';

async function ui(options = {}, context = process.cwd) {
	// console.log('ui=>');
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
}

export default (...args) => {
	return ui(...args);
};
