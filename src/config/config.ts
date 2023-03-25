import dotenv from 'dotenv';

dotenv.config();

// Database infos
const DB_USERNAME: string = process.env.DB_USERNAME || '';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
const DB_URL: string = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.p9cu0y8.mongodb.net/?retryWrites=true&w=majority`;

// Port to run server
const SERVER_PORT: string = process.env.SERVER_PORT || '';

export const config = {
  mongo: {
    url: DB_URL
  },
  server: {
    port: SERVER_PORT
  }
};
