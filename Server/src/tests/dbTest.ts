import * as tape from 'tape';

import { Test } from 'tape';

import dbBuild from '../config/Db/dbBuild';

import dummay from '../config/Db/dummyDate';

import { getAllCategory, getCategoryById, getCategoryByName } from '../database/query/category';

tape('tape is working ', (t: Test) => {
	t.equals(1, 1, 'one equals one');
	t.end();
});

tape('build Db ', async (t) => {
	const result = await dbBuild();
	t.equals(result, 1, 'The Db Build Successfully');
	t.end();
});

tape('Add Data ', async (t) => {
	const result = await dummay();
	t.equals(result, 1, 'The Data Added Successfully');
	t.end();
});

tape('Get All Category ', async (t) => {
	const res = await getAllCategory();
	t.equals(res.rowCount, 4, 'Get All Category Successfully');
	t.end();
});

tape('Get All Category ', async (t) => {
	const res = await getCategoryByName('Public');
	t.equals(res.rows[0].catg_name, 'Public', 'Get  Category by Name Successfully');
	t.end();
});

tape('Get All Category ', async (t) => {
	const res = await getCategoryById(2);
	t.equals(res.rows[0].catg_name, 'Freelancers', 'Get  Category by Id Successfully');
	t.end();
});

tape.onFailure(() => process.exit(0));
