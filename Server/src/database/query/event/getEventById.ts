import { QueryResult } from 'pg';
import connection from '../../connection';

export default (id: string): Promise<QueryResult> => {
	const sql = {
		text:
			'SELECT id,gid,title,category_id,description,event_date,event_time,event_location,event_status,host,member_cnt ,attendance_cnt FROM events where gid = $1;',
		values: [id],
	};
	return connection.query(sql.text, sql.values);
};
