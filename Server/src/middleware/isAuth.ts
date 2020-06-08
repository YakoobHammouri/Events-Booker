import * as express from 'express';
import * as dotenv from 'dotenv';

import { verify, VerifyErrors } from 'jsonwebtoken';

import { UnauthorizedMessage } from '../helpers/responseMessage';

import { getUserById } from '../database/query/user';

import ExpressRequest from '../Class/express.Request';

import JwtType from '../Class/JwtType';

import UsersType from '../Class/UsersType';

import logger from '../helpers/logger';

dotenv.config();
export default (
	req: ExpressRequest,
	res: express.Response,
	next: express.NextFunction,
): express.NextFunction | express.Response | void => {
	const token: string = !req.cookies ? '' : (req.cookies.AuthToken as string);

	if (!token) {
		return res.status(403).json(UnauthorizedMessage('', 'please login to continue... '));
	}

	const AccesToken: string = process.env.acces_Token_secret as string;

	verify(token, AccesToken, (err: VerifyErrors | null, payload: object | undefined):
		| express.NextFunction
		| express.Response
		| void => {
		if (err) {
			return res
				.status(403)
				.clearCookie('AuthToken')
				.json(UnauthorizedMessage('', 'please login to continue... '));
		}

		getUserById((payload as JwtType).id)
			.then((result) => {
				req.user = result.rows[0] as UsersType;
				return next();
			})
			.catch((error: Error) => {
				logger.error(`Some Error in Is Auth Function ${{ ...error }} `);
				return res
					.status(403)
					.clearCookie('AuthToken')
					.json(UnauthorizedMessage('', 'please login to continue... '));
			});
	});
};
