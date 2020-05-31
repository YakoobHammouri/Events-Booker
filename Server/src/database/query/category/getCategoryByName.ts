import { QueryResult } from 'pg';

import CategoryType from '../../../Class/CategoryType';

import connection from '../../connection';

export default (name: string): Promise<QueryResult<CategoryType>> => {
	const sql = {
		text: 'select * from category where catg_name = $1 ',
		values: [name],
	};
	return connection.query(sql.text, sql.values);
};
