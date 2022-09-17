import EventEmitter from 'events';
import stripAnsi from 'strip-ansi'; // 从字符串中去掉ANSI转义码
import chalk from 'chalk';

export const events = new EventEmitter();

const _log = (type, tag, message) => {
	if (process.env.VUE_BRICK_API_MODE && message) {
		events.emit('log', {
			message,
			type,
			tag,
		});
	}
};

const format = (label, msg) => {
	return msg
		.split('\n')
		.map((line, index) => {
			return index === 0 ? `${label} ${line}` : line.padStart(stripAnsi(label).length + line.length + 1);
		})
		.join('\n');
};

const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = (msg = '', tag = null) => {
	tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
	_log('log', tag, msg);
};
