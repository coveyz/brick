#!/usr/bin/env node
const program = require('commander');

program.version(`@/brick/cli ${require('../package.json').version}`).usage('<command> [options]');

program
	.command('create <name>')
	.description('start build 🚀')
	.action((name, options) => {
		require('../lib/create.js')(name, options);
	});

program.parse(process.argv);
