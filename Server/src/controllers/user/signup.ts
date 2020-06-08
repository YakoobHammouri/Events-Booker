import * as dotenv from 'dotenv';

import * as express from 'express';

import * as jwt from 'jsonwebtoken';

import { InternalErrorMessage, FailedMessage, successMessage } from '../../helpers/responseMessage';

import { registrationValidation } from '../../helpers/Validation';

import SignupTyps from '../../Class/SignupTyps';

import { user } from '../../database/query';

dotenv.config();

export default (req: express.Request, res: express.Response): express.Response | void => {
	const data: SignupTyps | null = !req.body ? null : (req.body as SignupTyps);

	if (!data) {
		return res
			.status(501)
			.json(InternalErrorMessage('', 'Sorry Some Error Happened at registration please try again later'));
	}

	const { error } = registrationValidation(data);

	if (error) {
		// return error message if not valid

		const errorMessage = error.toString().includes('[ref:password]')
			? 'the password not match , please re-Enter password'
			: error.toString().replace('ValidationError:', '');

		return res.status(400).json(FailedMessage('', `Oops ! ${errorMessage}`));
	}

	user.addUser(data, (err, gid) => {
		if (err) {
			return res.status(501).json(InternalErrorMessage('', 'internal error with the server'));
		}

		const auth = jwt.sign({ id: gid }, process.env.acces_Token_secret as string);
		res.cookie('AuthToken', auth);
		return res.status(200).json(successMessage('', ' You are registered successfully'));
	});
};
