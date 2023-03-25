import type { Express } from 'express';
import { config } from './config/config';
import DatabaseConnecter from './utils/DatabaseConnecter';
import Logging from './utils/Logger';
import ServerCreator from './utils/ServerCreator';

/** Create server */
const server: Express = ServerCreator.create();

/** Connect to MongoDB */
DatabaseConnecter.connect();

/** Start server */
server.listen(config.server.port, () => {
  Logging.info(`Server is running on port [${config.server.port}]`);
});
