import { readFileSync } from 'fs';

import { join } from 'path';

import logger from '../logger';

import connection from '../../database/connection';

const sql = readFileSync(join(__dirname, 'db_build.sql')).toString();

connection
	.query(sql)
	.then(() => logger.log('info', 'build created successfully!'))
	.catch((e: Error) => logger.log('error', 'failed to build', { ...e }));
