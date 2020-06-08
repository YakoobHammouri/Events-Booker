import { createLogger, transports, format } from 'winston';

export default createLogger({
	transports: [
		new transports.Console({
			level: 'info',
			format: format.combine(format.timestamp(), format.json()),
		}),
		new transports.File({
			filename: 'info.log',
			level: 'error',
			format: format.combine(format.timestamp(), format.json()),
		}),
	],
});
