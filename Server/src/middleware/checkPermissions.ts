import * as express from 'express';

import { ROLE } from '../helpers/Constants';

import { UnauthorizedMessage } from '../helpers/responseMessage';

import UsersType from '../Class/UsersType';

import ExpressRequest from '../Class/express.Request';

module.exports = (role: ROLE): Function => (
	req: ExpressRequest,
	res: express.Response,
	next: express.NextFunction,
): express.Response | express.NextFunction | void => {
	const user: UsersType | null = !req.user ? null : (req.user as UsersType);

	const roleAccess = !req.body.role ? role : req.body.role;

	if (!user) {
		return res
			.status(403)
			.clearCookie('AuthToken')
			.json(UnauthorizedMessage('', 'please login to continue... '));
	}

	if (user.role !== roleAccess) {
		return res.status(403).json(UnauthorizedMessage('', 'Access Denied ...'));
	}

	// user Have permissions to access
	next();
};
