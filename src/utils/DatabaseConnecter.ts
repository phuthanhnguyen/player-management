import mongoose from 'mongoose';
import { config } from '../config/config';
import Logging from './Logger';

export default class DatabaseConnecter {
  public static connect() {
    mongoose
      .connect(config.mongo.url)
      .then(() => {
        Logging.info('Connected to DB');
      })
      .catch(() => {
        Logging.error('could not connect to DB');
        process.exit(1);
      });
  }
}
