// this method use  with isAuth to check Toke
// if the isAuth retrun next(),
// then the token Ok
// otherwise the isAuth will Return status 403

import * as express from 'express';

import { ROLE } from '../helpers/Constants';

import UsersType from '../Class/UsersType';

import ExpressRequest from '../Class/express.Request';

export default (req: ExpressRequest, res: express.Response): express.Response | void => {
	const user: UsersType = req.user as UsersType;
	res.status(200).json({
		user: {
			name: user.user_name,
			role: user.role === ROLE.ADMIN,
		},
	});
};
