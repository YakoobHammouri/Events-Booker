import { QueryResult } from 'pg';
import connection from '../../connection';

import UsersType from '../../../Class/UsersType';

export default (id: string): Promise<QueryResult<UsersType>> => {
	const sql = {
		text: 'SELECT * FROM users where gid = $1;',
		values: [id],
	};
	return connection.query(sql.text, sql.values);
};
