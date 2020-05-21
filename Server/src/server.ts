import app from './app';
import logger from './config/logger';
export default app.listen(app.get('port'), () =>
	logger.log('info', `server Run on PORT ${app.get('port')}`),
);
