import { QueryResult } from 'pg';

import connection from '../../connection';

import CategoryType from '../../../Class/CategoryType';

export default (id: number): Promise<QueryResult<CategoryType>> => {
	const sql = {
		text: 'select * from category where id = $1 ',
		values: [id],
	};
	return connection.query(sql.text, sql.values);
};
