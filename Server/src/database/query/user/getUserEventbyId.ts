import { QueryResult } from 'pg';
import connection from '../../connection';

import UserInfoEventInfoType from '../../../Class/UserInfoEventInfoType';

export default (eventId: string, userId: string): Promise<QueryResult<UserInfoEventInfoType>> => {
	const sql = {
		text: `SELECT events.title , events.event_date , events.event_time , events.event_status , events.member_cnt,
                  userEvent.id , userEvent.gid , userEvent.code , userEvent.attendance_status ,userEvent.note 
           FROM 
           users inner join userEvent on 
           users.id = userEvent.user_id 
           inner join events on 
           userEvent.event_id = events.id
           WHERE  events.gid=$1 AND users.gid=$2;`,
		value: [eventId, userId],
	};
	return connection.query(sql.text, sql.value);
};
