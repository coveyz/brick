import { openBrowser } from '@brick/cli-shared-utils';

function ui(options = {}, context = process.cwd) {
	console.log('ui=>');
	console.log('test-sharedUtils-openBrowser', openBrowser);
}

export default (...args) => {
	return ui(...args);
};
