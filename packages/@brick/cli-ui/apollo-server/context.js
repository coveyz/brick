import db from './util/db.js';
import pubsub from './pubsub.js';
import cwd from './connectors/cwd.js';

export default ({ req } = {}) => {
	return {
		db,
		pubsub,
		cwd: cwd.get(),
	};
};
