import { QueryResult } from 'pg';

import connection from '../../connection';

/*
get userEvent   for how Enroll in the Event
*/
export default (eventId: string, userId: string, code: string): Promise<QueryResult> => {
	const sql = {
		text: `SELECT  userEvent.id , users.user_name , userEvent.code , userEvent.attendance_status
           FROM 
           users inner join userEvent on 
           users.id = userEvent.user_id 
           inner join events on 
           userEvent.event_id = events.id
           where events.gid = $1 AND users.gid = $2 AND userEvent.code = $3;`,
		value: [eventId, userId, code],
	};
	return connection.query(sql.text, sql.value);
};
