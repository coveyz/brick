import path from 'path';
import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import * as rcFolder from './rcFolder.js';

const db = new Lowdb(new FileSync(path.resolve(rcFolder.default, 'db.json')));

//* 种 空DB
db.defaults({
	projects: [],
	foldersFavorite: [],
	tasks: [],
	config: {},
}).write();

export default db;
