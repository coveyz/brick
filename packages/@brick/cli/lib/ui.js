import { openBrowser } from '@brick/cli-shared-utils';
import { portfinder, server } from '@brick/cli-ui/server.js';

function ui(options = {}, context = process.cwd) {
	console.log('ui=>');
	// console.log('test-sharedUtils-openBrowser', openBrowser);
	// console.log('test-sharedUtils-portfinder', portfinder);
	// console.log('test-sharedUtils-server', server);
}

export default (...args) => {
	return ui(...args);
};
