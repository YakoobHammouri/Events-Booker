import { QueryResult } from 'pg';

import connection from '../../connection';

import CategoryType from '../../../Class/CategoryType';

export default (): Promise<QueryResult<CategoryType>> => {
	const sql = {
		text: 'select * from category ',
	};
	return connection.query(sql.text);
};
