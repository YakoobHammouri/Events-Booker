import { QueryResult } from 'pg';
import connection from '../../connection';

import EventsType from '../../../Class/EventsType';

export default (): Promise<QueryResult<EventsType>> => {
	const sql = {
		text: 'select * from events order by event_date DESC , event_time ASC;',
	};
	return connection.query(sql.text);
};
