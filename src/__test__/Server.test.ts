import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ServerCreator from '../utils/ServerCreator';
import mongoose from 'mongoose';
import type { IPlayer } from '../models/Player';

const app = ServerCreator.create();

export const createPlayerPayload: Omit<IPlayer, 'rank'> = {
  nickname: 'testNickname',
  score: 100
};

describe('Player API tests', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // Empty database after each test
  afterEach(async () => {
    await supertest(app).delete('/players');
  });

  describe('create player', () => {
    describe('create a new player', () => {
      it('Should return 201', async () => {
        // When
        const { body, statusCode } = await supertest(app).post('/players').send(createPlayerPayload);
        // Then
        expect(statusCode).toBe(201);
        expect(body.nickname).toBe('testNickname');
        expect(body.score).toBe(100);
      });
    });

    describe('create a player with a nickname that already exists', () => {
      it('Should return 400', async () => {
        // Given: we have a player in the DB
        await supertest(app).post('/players').send(createPlayerPayload);
        // When
        const { statusCode } = await supertest(app).post('/players').send(createPlayerPayload);
        // Then
        expect(statusCode).toBe(400);
      });
    });
  });

  describe('get player', () => {
    describe('get a player by nickname', () => {
      it('should return a 200', async () => {
        // Given: we have a player in the DB
        const createRes = await supertest(app).post('/players').send(createPlayerPayload);
        // When
        const { body, statusCode } = await supertest(app).get(`/players/${createRes.body.nickname}`);
        // Then
        expect(statusCode).toBe(200);
        expect(body.nickname).toBe('testNickname');
        expect(body.score).toBe(100);
      });
    });

    describe('get a player by id', () => {
      it('should return a 200', async () => {
        // Given: we have a player in the DB
        const createRes = await supertest(app).post(`/players`).send(createPlayerPayload);
        // When
        const { body, statusCode } = await supertest(app).get(`/players/${createRes.body._id}`);
        // Then
        expect(statusCode).toBe(200);
        expect(body.nickname).toBe('testNickname');
        expect(body.score).toBe(100);
      });
    });

    describe('get player not found', () => {
      it('should return a 404', async () => {
        // When
        const { statusCode } = await supertest(app).get(`/players/wrongNickname`);
        //Then
        expect(statusCode).toBe(404);
      });
    });
  });

  describe('get all players', () => {
    it('should return a 200', async () => {
      // Given: we have 2 players in the DB
      const createFirstPlayer = await supertest(app).post(`/players`).send(createPlayerPayload);
      const createSecondPlayer = await supertest(app).post(`/players`).send({
        nickname: 'test nickname 2',
        score: 120
      });
      //When
      const { body, statusCode } = await supertest(app).get(`/players`);
      // Then
      expect(statusCode).toBe(200);
      expect(body).toEqual([
        { ...createSecondPlayer.body, rank: 1 },
        { ...createFirstPlayer.body, rank: 2 }
      ]);
    });
  });

  describe('update player score', () => {
    describe('update player score by nickname', () => {
      it('should return a 200', async () => {
        // Given: we have a player in the DB
        const createPlayerRes = await supertest(app).post(`/players`).send(createPlayerPayload);
        // When
        const { body, statusCode } = await supertest(app)
          .put(`/players/${createPlayerRes.body.nickname}`)
          .send({ score: 90 });
        // Then
        expect(statusCode).toBe(200);
        expect(body.nickname).toBe('testNickname');
        expect(body.score).toBe(90);
      });
    });

    describe('update player score by id', () => {
      it('should return a 200', async () => {
        // Given: we have a player in the DB
        const createPlayerRes = await supertest(app).post(`/players`).send(createPlayerPayload);
        // When
        const { body, statusCode } = await supertest(app)
          .put(`/players/${createPlayerRes.body._id}`)
          .send({ score: 90 });
        // Then
        expect(statusCode).toBe(200);
        expect(body.nickname).toBe('testNickname');
        expect(body.score).toBe(90);
      });
    });

    describe('update player not found', () => {
      it('should return a 404', async () => {
        // When
        const { statusCode } = await supertest(app).put(`/players/wrongNickname`).send({ score: 90 });
        // Then
        expect(statusCode).toBe(404);
      });
    });
  });

  describe('delete player', () => {
    describe('delete player by nickname', () => {
      it('should return a 200', async () => {
        // Given: we have a player in the DB
        const createPlayerRes = await supertest(app).post(`/players`).send(createPlayerPayload);
        // When
        const { statusCode } = await supertest(app).delete(`/players/${createPlayerRes.body.nickname}`);
        //Then
        expect(statusCode).toBe(200);
        // Verify if player is deleted
        expect((await supertest(app).get(`/players/${createPlayerRes.body.nickname}`)).statusCode).toBe(404);
      });
    });

    describe('delete player by id', () => {
      it('should return a 200', async () => {
        // Given: we have a player in the DB
        const createPlayerRes = await supertest(app).post(`/players`).send(createPlayerPayload);
        // When
        const { statusCode } = await supertest(app).delete(`/players/${createPlayerRes.body._id}`);
        // Then
        expect(statusCode).toBe(200);
        // Verify if player is deleted
        expect((await supertest(app).get(`/players/${createPlayerRes.body._id}`)).statusCode).toBe(404);
      });
    });

    describe('delete player not found', () => {
      it('should return a 404', async () => {
        // When
        const { statusCode } = await supertest(app).delete(`/players/wrongNickname`);
        // Then
        expect(statusCode).toBe(404);
      });
    });
  });

  describe('delete all players', () => {
    describe('delete all players', () => {
      it('should return a 200', async () => {
        // Given: we have 2 players in the DB
        await supertest(app).post(`/players`).send(createPlayerPayload);
        await supertest(app).post(`/players`).send({
          nickname: 'test nickname 2',
          score: 120
        });
        // When
        const { statusCode } = await supertest(app).delete(`/players`);
        // Then
        expect(statusCode).toBe(200);
        // Verify if every players were deleted
        expect((await supertest(app).get(`/players`)).body).toEqual([]);
      });
    });
  });
});
