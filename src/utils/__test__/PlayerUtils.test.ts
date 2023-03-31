import mongoose from 'mongoose';
import type { IPlayer } from '../../models/Player';
import PlayerUtils from '../PlayerUtils';

describe('PlayerUtils test', () => {
  describe('rankingPlayers test', () => {
    it('Should return list of players with rank for each one in the list and sorted by score in desc order', () => {
      const players: (IPlayer & {
        _id: mongoose.Types.ObjectId;
      })[] = [
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e0'),
          nickname: 'player 1',
          score: 100
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e1'),
          nickname: 'player 2',
          score: 120
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e2'),
          nickname: 'player 3',
          score: 85
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e3'),
          nickname: 'player 4',
          score: 110
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e4'),
          nickname: 'player 5',
          score: 100
        }
      ];

      PlayerUtils.rankingPlayers(players);
      expect(players).toEqual([
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e1'),
          nickname: 'player 2',
          score: 120,
          rank: 1
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e3'),
          nickname: 'player 4',
          score: 110,
          rank: 2
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e0'),
          nickname: 'player 1',
          score: 100,
          rank: 3
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e4'),
          nickname: 'player 5',
          score: 100,
          rank: 3
        },
        {
          _id: new mongoose.Types.ObjectId('64224ca19438cfcdd892a8e2'),
          nickname: 'player 3',
          score: 85,
          rank: 5
        }
      ]);
    });
  });

  describe('isValidObjectId test', () => {
    it('Should return true when an object id is given', () => {
      expect(PlayerUtils.isValidObjectid('64224ca19438cfcdd892a8e1')).toBe(true);
    });
    it('Should return true when an wrong object id is given', () => {
      expect(PlayerUtils.isValidObjectid('wrong_object_id')).toBe(false);
    });
  });
});
