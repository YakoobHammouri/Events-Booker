import { QueryResult } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import connection from '../../connection';

import UserEventType from '../../../Class/UserEventType';

export default (
	eventId: number,
	userId: number,
	userCode: string,
): Promise<QueryResult<UserEventType>> => {
	const sql = {
		text: 'INSERT INTO userEvent (gid, event_id,user_id,code ) values($1,$2,$3,$4)',
		value: [uuidv4(), eventId, userId, userCode],
	};
	return connection.query(sql.text, sql.value);
};
