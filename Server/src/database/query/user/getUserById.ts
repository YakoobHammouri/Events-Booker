import { QueryResult } from 'pg';
import connection from '../../connection';

export default (id: string): Promise<QueryResult> => {
	const sql = {
		text: 'SELECT * FROM users where gid = $1;',
		values: [id],
	};
	return connection.query(sql.text, sql.values);
};
