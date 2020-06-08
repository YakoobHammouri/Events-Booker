import { QueryResult } from 'pg';
import connection from '../../connection';

import UserEventType from '../../../Class/UserEventType';

export default (id: number): Promise<QueryResult<UserEventType>> => {
	const sql = {
		text: 'delete FROM userEvent where id = $1;',
		values: [id],
	};
	return connection.query(sql.text, sql.values);
};
