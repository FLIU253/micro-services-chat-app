import 'reflect-metadata';

import { initConnection } from './db/connection';

initConnection().then(() => {
	console.log('DB connection established!');
});
