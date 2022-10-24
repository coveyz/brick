import fs from 'fs-extra';
import path from 'path';
import channels from '../channels.js';

// console.log('channels=>', channels);

let cwd = process.cwd();

const normalize = () => {};

export default {
	get: () => cwd,
	set: (value, context) => {
		value = normalize(value);
		if (!fs.existsSync(value)) return;
		cwd = value;
		process.env.VUE_CLI_CONTEXT = value;
		context.pubsub.publish(channels.CWD_CHANGED, { cwdChanged: value });

		try {
			process.chdir(value);
		} catch (error) {}
	},
};
