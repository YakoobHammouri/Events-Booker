import * as express from 'express';
import { getUserByEmail } from '../database/query/user';
import logger from '../helpers/logger';
import { FailedMessage, InternalErrorMessage } from '../helpers/responseMessage';

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
): express.NextFunction | express.Response | void => {
	const { email } = req.params;

	getUserByEmail(email)
		.then((result) => {
			if (result.rowCount !== 0) {
				return res
					.status(400)
					.json(FailedMessage({ isAvailable: false }, 'This Email is already used in our system'));
			}

			return next();
		})
		.catch((err) => {
			logger.error('Errror in Check Email : ', { ...err });
			return res
				.status(200)
				.json(InternalErrorMessage({ isAvailable: false }, 'internal error with the server'));
		});
};
