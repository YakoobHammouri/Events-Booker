import { readFileSync } from 'fs';

import { join } from 'path';

import logger from '../../helpers/logger';

import connection from '../../database/connection';

export default async (): Promise<number> => {
	const sql = readFileSync(join(__dirname, 'dbBuild.sql')).toString();

	let isBuild = false;
	await connection
		.query(sql)
		.then((result) => {
			logger.log('info', 'build created successfully!');
			isBuild = true;
		})
		.catch((e: Error) => {
			logger.log('error', 'failed to build', { ...e });
		});

	return isBuild ? 1 : 0;
};
