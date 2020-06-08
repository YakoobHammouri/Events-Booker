import * as bcrypt from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';

import logger from '../../../helpers/logger';

import connection from '../../connection';

import { ROLE } from '../../../helpers/Constants';

import Iuser from '../../../Class/SignupTyps';

export interface IcallBack {
	(err: null | Error, result: null | string): void;
}

export default (userDetails: Iuser, callback: IcallBack): string | IcallBack | null => {
	const { name, phone, email, password, birthDate } = userDetails;
	const role = !userDetails.role ? ROLE.USER : userDetails.role;
	const gid = uuidv4();

	bcrypt
		.hash(password, 10)
		.then((passwordHash: string) => {
			const sql = {
				text:
					'INSERT INTO USERS  (gid, user_name, phone, birth_date, email, university, address, role, profession, password) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)',
				values: [gid, name, phone, birthDate, email, 'Unknown', 'Unknown', role, 'Unknown', passwordHash],
			};

			connection
				.query(sql.text, sql.values)
				.then(() => {
					if (callback) return callback(null, gid);
					return gid;
				})
				.catch((error: Error) => {
					if (callback) return callback(error, null);
					return error;
				});
		})
		.catch((error: Error) => {
			logger.log('info', `Error in add user : ${error}`);
			logger.log('error', `Error in add user : ${error}`);
			return callback(error, null);
		});

	return null;
};
