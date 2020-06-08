import { Pool } from 'pg';

import * as dotenv from 'dotenv';

import logger from '../helpers/logger';

dotenv.config();
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	logger.info(`The Db Connection not Found ${connectionString}`);
	throw new Error('Db Connection not Found');
}

logger.info(connectionString);

const option = {
	connectionString,
	ssl: !connectionString.includes('localhost'),
};

export default new Pool(option);
