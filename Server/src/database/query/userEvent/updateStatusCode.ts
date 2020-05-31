import { QueryResult } from 'pg';
import connection from '../../connection';

export default (id: number, status: boolean): Promise<QueryResult> => {
	const sql = {
		text: 'UPDATE userEvent   SET   attendance_status = $1 where id = $2',
		value: [status, id],
	};
	return connection.query(sql.text, sql.value);
};
