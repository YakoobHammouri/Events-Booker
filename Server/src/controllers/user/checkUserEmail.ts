import * as express from 'express';

import { successMessage } from '../../helpers/responseMessage';

// we the code Arrived here , then the Email is is Available

export default (req: express.Request, res: express.Response): express.Response =>
	res
		.status(200)
		.json(
			successMessage(
				{ isAvailable: true },
				'This Email is not used in our system , you can continue in sign up',
			),
		);
