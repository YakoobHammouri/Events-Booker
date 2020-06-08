import * as express from 'express';

export default (req: express.Request, res: express.Response): express.Response =>
	res.clearCookie('AuthToken').sendStatus(200);
