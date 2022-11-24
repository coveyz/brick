import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fallback from 'express-history-api-fallback';

const __dirname = dirname(fileURLToPath(import.meta.url)); //解决ESM __dirname
const CACHE_CONTROL = 'no-store, no-cache, must-revalidate, private';

const distPath = path.resolve(__dirname, '../dist');
const publicPath = path.resolve(__dirname, '../ui-public');

const setHeaders = (res, path, stat) => {
	// console.log('apollo-server-server-setHeaders=>');
	res.set('CacheCache-Control', CACHE_CONTROL);
};

export default (app) => {
	app.use(express.static(distPath, { setHeaders }));
	app.use('/public', express.static(publicPath, { setHeaders }));
	app.use(
		fallback(path.join(distPath, 'index.html'), {
			headers: {
				CacheCache: CACHE_CONTROL,
			},
		})
	);
	//todo _plugin/*, _addon
};
