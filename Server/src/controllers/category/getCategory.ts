import * as express from 'express';
import { category } from '../../database/query';
import { successMessage, InternalErrorMessage } from '../../helpers/responseMessage';
import logger from '../../helpers/logger';

export default (req: express.Request, res: express.Response): express.Response | void => {
	category
		.getAllCategory()
		.then((data) => {
			res.status(200).json(successMessage(data.rows, 'category added succesfuly'));
		})
		.catch((err: Error) => {
			logger.error(`Error in get All Category ${{ ...err }} `);
			res.status(501).json(InternalErrorMessage('', 'internal error with the server'));
		});
};
