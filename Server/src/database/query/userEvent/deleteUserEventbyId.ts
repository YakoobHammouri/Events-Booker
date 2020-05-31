import { QueryResult } from 'pg';
import connection from '../../connection';

export default (id: number): Promise<QueryResult> => {
	const sql = {
		text: 'delete FROM userEvent where id = $1;',
		values: [id],
	};
	return connection.query(sql.text, sql.values);
};
