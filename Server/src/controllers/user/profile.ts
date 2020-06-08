import * as express from 'express';

import expressRequest from '../../Class/express.Request';
import UsersType from '../../Class/UsersType';

import { user } from '../../database/query';

import logger from '../../helpers/logger';

import { InternalErrorMessage, UnauthorizedMessage, successMessage } from '../../helpers/responseMessage';

export default async (req: expressRequest, res: express.Response): Promise<express.Response> => {
	const userData: UsersType = req.user as UsersType;
	try {
		let userEvents = null;
		if (userData.role !== 'admin') {
			userEvents = (await user.getAllUserEvent(userData.gid)).rows;
		}
		/*
      if userinfo not found ,
      the user must be login again to continue  
    */
		if (!user) {
			return res
				.status(403)
				.clearCookie('AuthToken')
				.json(UnauthorizedMessage('', 'please login to continue... '));
		}
		return res.status(200).json(successMessage({ userInfo: user, userEvents }, 'user profile'));
	} catch (err) {
		logger.error(` Error in Get Profile :${{ ...err }} `);
		return res.status(200).json(InternalErrorMessage('', 'internal error in the server'));
	}
};
