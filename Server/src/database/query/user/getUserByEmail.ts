import { QueryResult } from 'pg';
import connection from '../../connection';

export default (email: string): Promise<QueryResult> => {
	const sql = {
		text: 'SELECT email ,password,gid,user_name,role FROM users WHERE email =$1;',
		values: [email],
	};
	return connection.query(sql.text, sql.values);
};
