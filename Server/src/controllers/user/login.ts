import * as express from 'express';

import * as dotenv from 'dotenv';

import * as bcrypt from 'bcrypt';

import * as jwt from 'jsonwebtoken';

import logger from '../../helpers/logger';

import { user } from '../../database/query';

import { FaildLoginMessage, successMessage, InternalErrorMessage } from '../../helpers/responseMessage';

import { logInValidation } from '../../helpers/Validation';

import { ROLE } from '../../helpers/Constants';

import UsersType from '../../Class/UsersType';

dotenv.config();

export default (req: express.Request, res: express.Response): express.Response | void => {
	const userData: UsersType = req.body as UsersType;
	const { error } = logInValidation(userData);

	if (error !== undefined) {
		// return error message if not valid
		const errorMessage = error.toString().includes('^[a-zA-Z0-9]{3,30}$')
			? 'the password must including Upper/lowercase and numbers characters'
			: error.toString().replace('ValidationError:', '');
		return res.status(400).json(FaildLoginMessage('', `Oops ! ${errorMessage}`));
	}

	user
		.getUserByEmail(userData.email)
		.then((data) => {
			if (data.rowCount === 0) {
				return res.status(404).json(FaildLoginMessage('', 'make sure of your email or password'));
			}
			bcrypt
				.compare(userData.password, data.rows[0].password)
				.then((checkPss: boolean) => {
					if (!checkPss) {
						return res.status(403).json(FaildLoginMessage('', 'make sure of your email or password'));
					}
					const auth = jwt.sign({ id: data.rows[0].gid }, process.env.acces_Token_secret as string);
					res.cookie('AuthToken', auth);
					res
						.status(200)
						.json(
							successMessage(
								{ isAdmin: data.rows[0].role === ROLE.ADMIN },
								'welcome , you are login Successfully',
							),
						);
				})
				.catch((err: Error) => {
					res.status(501).json(InternalErrorMessage('', 'internal error with the server'));
					logger.error(`Some Error Happened in bcrypt Compare : ${{ ...err }} `);
				});
		})
		.catch((err: Error) => {
			res.status(501).json(InternalErrorMessage('', 'internal error with the server'));
			logger.error(`Some Error Happened in user get User By Email  : ${{ ...err }} `);
		});
};
