import fs from 'fs-extra';
import os from 'os';
import path from 'path';

//3.0.0-rc.7的迁移
//我们在AppData中引入了存储.vuerc的更改，但好处不是
//非常明显，因此我们正在恢复它以保持跨操作系统的一致性
const migrateWindowsConigPath = (file) => {
	// console.log('migrateWindowsConigPath-file=>', file);
	if (process.platform !== 'win32') return;
	const appData = process.env.APPDATA;
	console.log('todo-migrateWindowsConigPath-win32-appData', appData);
};

const xdgConfigPath = (file) => {
	const xdgConfigPath = process.env.XDG_CONFIG_PATH;
	if (xdgConfigPath) {
		console.log('todo-xdgConfigPath');
	}
};

export const getRcPath = (file) => {
	// console.log('cli-lib-util-rcParh=>file', file);
	migrateWindowsConigPath(file);

	return (
    process.env.VUE_CLI_CONFIG_PATH || 
    xdgConfigPath(file) || 
    path.join(os.homedir(),file)
  )
};
