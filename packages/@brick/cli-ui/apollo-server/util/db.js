import Lowdb from 'lowdb';
import FileSync from 'lowdb/lib/adapters/TextFileSync';
import path from 'path';
import * as rcFolder from './rcFolder';

const db = new Lowdb(new FileSync(path.resolve(rcFolder, 'db.json')));

console.log('db=>', db);

//* 种 空DB
db.defaults({
	projects: [],
	foldersFavorite: [],
	tasks: [],
	config: {},
}).write();

export default db;
