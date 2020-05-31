import { QueryResult } from 'pg';
import connection from '../../connection';

// update attendance_cnt , member_cnt
// if isAttendance === true then we need to update the attendance_cnt,
// otherWise update 'member_cnt'
export default (eventId: string, count: string, isAttendance: string): Promise<QueryResult> => {
	const columeName = isAttendance ? 'attendance_cnt' : 'member_cnt';

	const sql = {
		text: `UPDATE events SET  ${columeName} = $1 where gid = $2`,
		value: [count, eventId],
	};
	return connection.query(sql.text, sql.value);
};
