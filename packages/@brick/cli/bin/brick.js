#!/usr/bin/env node

// const program = require('commander');
import { program } from 'commander';

// import pck from '../package.json' assert { type: 'json' };
// program.version(`@/brick/cli ${pck.version}`).usage('<command> [options]');

program
	.command('create <name>')
	.description('start build 🚀')
	.action((name, options) => {
		// require('../lib/create.js').default(name, options);
	});

program
	.command('ui')
	.description('start and open blockUi 🖌️')
	.action(async (options) => {
		// uiOptions(options)
		const { default: uiOption } = await import('../lib/ui.js');

		uiOption();
	});

program.parse(process.argv);
