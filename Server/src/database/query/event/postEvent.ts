import { v4 as uuidv4 } from 'uuid';

import { QueryResult } from 'pg';

import logger from '../../../helpers/logger';

import connection from '../../connection';

import { EVENTSTATUS } from '../../../helpers/Constants';

import EventsType from '../../../Class/EventsType';

export interface EventObject {
	title: string;
	categoryId: number;
	description: string;
	eventDate: string;
	eventTime: string;
	eventLocation: string;
	host: string;
}

export default (eventDetails: EventObject): Promise<QueryResult<EventsType>> => {
	const {
		title,
		categoryId,
		description,
		eventDate,
		eventTime,
		eventLocation,
		host,
	} = eventDetails;

	let getEventTime;
	let getEventDate;

	try {
		const time = new Date(eventTime);
		getEventTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
	} catch (err) {
		logger.log('info', `Can not Convert ${eventTime} to Date Time`);
		logger.log('Error', `Can not Convert ${eventTime} to Date Time`);
		getEventTime = '00:00:00';
	}

	try {
		getEventDate = new Date(eventDate);
	} catch (err) {
		logger.log('info', `Can not Convert ${eventDate} to Date Time`);
		logger.log('Error', `Can not Convert ${eventDate} to Date Time`);
		getEventDate = '1-1-1970';
	}

	const sql = {
		text:
			'INSERT INTO events  (gid, title, category_id , description, event_date, event_time, event_location, host ,event_status , attendance_cnt ) VALUES ($1, $2, $3, $4,$5,$6,$7,$8 ,$9 , $10)',
		values: [
			uuidv4(),
			title,
			categoryId,
			description,
			getEventDate,
			getEventTime,
			eventLocation,
			host,
			EVENTSTATUS.OPEN,
			0,
		],
	};
	return connection.query(sql.text, sql.values);
};
