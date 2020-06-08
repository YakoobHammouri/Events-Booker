import app from './app';

import logger from './helpers/logger';

export default app.listen(app.get('port'), () =>
	logger.info(`server Run on PORT ${app.get('port')}`),
);
