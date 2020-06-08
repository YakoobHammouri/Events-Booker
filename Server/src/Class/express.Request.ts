import * as express from 'express';

import UsersType from './UsersType';

export default interface Request extends express.Request {
	user: UsersType;
}
