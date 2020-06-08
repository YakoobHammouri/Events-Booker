import { QueryResult } from 'pg';
import connection from '../../connection';

import UserEventType from '../../../Class/UserEventType';

export default (id: number, status: boolean): Promise<QueryResult<UserEventType>> => {
	const sql = {
		text: 'UPDATE userEvent   SET   attendance_status = $1 where id = $2',
		value: [status, id],
	};
	return connection.query(sql.text, sql.value);
};
