import express from 'express';
import type { Express } from 'express';
import Logging from './Logger';
import playerRoutes from '../routes/PlayerRoutes';
import cors from '../middleware/Cors';

export default class ServerCreator {
  public static create = () => {
    /** Configure server */
    const server: Express = express();
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    /** Enable CORS */
    server.use(cors);

    /** Routes */
    server.use('/players', playerRoutes);

    /** Server healthcheck */
    server.use('/ping', (req, res) => {
      Logging.info(typeof req);
      return res.status(200).json({ message: 'Server is up!' });
    });

    return server;
  };
}
