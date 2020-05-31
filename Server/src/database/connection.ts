import { Pool } from 'pg';

import * as dotenv from 'dotenv';

import logger from '../config/logger';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	logger.log('error', `The Db Connection not Found ${connectionString}`);
	throw new Error('Db Connection not Found');
}

const option = {
	connectionString,
	ssl: !connectionString.includes('localhost'),
};

export default new Pool(option);
