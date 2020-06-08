import * as express from 'express';
import { successMessage, InternalErrorMessage } from '../../helpers/responseMessage';
import { user } from '../../database/query';
import logger from '../../helpers/logger';
import expressRequest from '../../Class/express.Request';

/*
get event of current user
by passing eventId in request ,
this method using in event Details to diplay the user code of this evnte
*/
export default (req: expressRequest, res: express.Response): express.Response | void => {
	// get eventId from req.body
	const { eventId } = req.params;
	const userId = req.user.gid;

	user
		.getUserEventById(eventId, userId)
		.then((result) => res.status(200).json(successMessage({ userEvent: result.rows[0] }, 'user Event')))
		.catch((err) => {
			logger.error(`Error in Get user Event : ${{ ...err }}`);
			return res.status(501).json(InternalErrorMessage('', 'internal error with the server'));
		});
};
