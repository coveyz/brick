import path from 'path';
import fs from 'fs-extra';
import { getRcPath } from '@brick/cli/lib/util/rcPath';

let folder;

if (process.env.VUE_CLI_UI_TEST) {
	console.log('todo=> VUE_CLI_UI_TEST');
} else if (process.env.VUE_CLI_UI_DEV) {
	console.log('todo=> VUE_CLI_UI_DEV');
} else {
	folder = (process.env.VUE_CLI_UI_DB_PATH && path.resolve(__dirname, process.env.VUE_CLI_UI_DB_PATH)) || getRcPath('.block-cli-ui');
}

export default folder;
