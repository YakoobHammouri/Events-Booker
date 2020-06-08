import { QueryResult } from 'pg';
import connection from '../../connection';

import EventsType from '../../../Class/EventsType';

export default (): Promise<QueryResult<EventsType>> => {
	const sql = {
		text:
			'select gid , title ,category_id ,description , event_date  ,event_time ,host ,event_location from events where event_date = $1',
		value: [new Date().toLocaleDateString()],
	};

	return connection.query(sql.text, sql.value);
};
