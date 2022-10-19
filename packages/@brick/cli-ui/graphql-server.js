import express from 'express';
import deepmerge from 'deepmerge';

export default function (options, cb = null) {
	options = deepmerge(
		{
			integratedEngine: false,
		},
		options
	);
	console.log('graphql-server-options=>', options);
	const app = new express();
}
