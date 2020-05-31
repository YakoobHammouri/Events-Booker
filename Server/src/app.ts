import * as express from 'express';

import { Application, Request, Response } from 'express';

import { join } from 'path';

import * as cookieParser from 'cookie-parser';

import * as compression from 'compression';

import router from './controllers';

const app: Application = express();

app.set('port', process.env.PORT || 5000);
app.use(express.json());

app.use(cookieParser());

app.use(compression());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(join(__dirname, '..', 'client', 'build')));
app.use(router);

app.get('*', (req: Request, res: Response) => {
	res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

export default app;
