import child_process from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import open from 'open';

const __dirname = dirname(fileURLToPath(import.meta.url)); //解决ESM __dirname
const OSX_CHROME = 'google chrome';
const Actions = Object.freeze({
	NONE: 0,
	BROWSER: 1,
	SCRIPT: 2,
});
const execSync = child_process.execSync;

const getBrowserEnv = () => {
	const value = process.env.BROWSER;
	let action;

	if (!value) {
		// 默认
		action = Actions.BROWSER;
	} else if (value.toLowerCase().endsWith('.js')) {
		action = Actions.SCRIPT;
	} else if (value.toLowerCase().endsWith() === 'none') {
		action = Actions.NONE;
	} else {
		action = Actions.BROWSER;
	}

	return { value, action };
};

// 启动浏览器进程
const startBrowserProcess = (browser, url) => {
	const shouldTryOpenChromeWithAppleScript = process.platform === 'darwin' && (typeof browser !== 'string' || browser === OSX_CHROME);
	// console.log('startBrowserProcess=>', browser, url, 'shouldTryOpenChromeWithAppleScript=>', shouldTryOpenChromeWithAppleScript);
	if (shouldTryOpenChromeWithAppleScript) {
		try {
			// 尽量重用现有的选项卡
			execSync('ps cax | grep "Google Chrome"');
			execSync('osascript openChrome.applescript"' + encodeURI(url) + '"', {
				cwd: __dirname,
				stdio: 'ignore',
			});
			return true;
		} catch (error) {}
	}

	if (process.platform === 'darwin' && browser === 'open') {
		browser = undefined;
	}

	// 打开新的 选项卡
	try {
		const options = { app: { name: browser }, url: true };
		open(url, options).catch(() => {});
		return true;
	} catch (error) {
		return false;
	}
};

const openBrowser = (url) => {
	const { value, action } = getBrowserEnv();
	console.log('openBrowser=>', url, 'envResult==>', { value, action });
	switch (action) {
		case Actions.NONE:
			return false;
		case Actions.SCRIPT:
			return console.info('todo Actions-SCRIPT');
		case Actions.BROWSER:
			return startBrowserProcess(value, url);
		default:
			throw new Error('Not implemented');
	}
};

export default openBrowser;
