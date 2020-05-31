import { QueryResult } from 'pg';
import connection from '../../connection';

export default (): Promise<QueryResult> => {
	const sql = {
		text: 'select * from events order by event_date DESC , event_time ASC;',
	};
	return connection.query(sql.text);
};
