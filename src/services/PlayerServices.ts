import mongoose from 'mongoose';
import Player from '../models/Player';
import PlayerUtils from '../utils/PlayerUtils';

/**
 * Create player by that nickname and its score.
 * @param nickname
 * @param score
 * @returns the created player.
 */
const createPlayer = (nickname: string, score: number) => {
  const player = new Player({
    _id: new mongoose.Types.ObjectId(),
    nickname,
    score: score ? score : 0
  });

  return player.save();
};

/**
 * Get a player with his rank by his ID ou his nickname.
 * @param playerIdOrNickname
 * @returns player.
 */
const getPlayer = async (playerIdOrNickname: string) => {
  const players = await Player.find();
  PlayerUtils.rankingPlayers(players);

  if (PlayerUtils.isValidObjectid(playerIdOrNickname)) {
    return players.find((player) => player.get('_id').toJSON() === playerIdOrNickname);
  } else {
    return players.find((player) => player.nickname === playerIdOrNickname);
  }
};

/**
 * Get all the players with their rank
 * @returns
 */
const getAllPlayers = async () => {
  const players = await Player.find();
  PlayerUtils.rankingPlayers(players);
  return players;
};

/**
 * Update the score of a player by his ID or his nickname
 * @param playerIdOrNickname
 * @param updatePlayer
 * @returns
 */
const updatePlayer = async (playerIdOrNickname: string, updatePlayer: object) => {
  let player;
  if (PlayerUtils.isValidObjectid(playerIdOrNickname)) {
    player = await Player.findById(playerIdOrNickname);
  } else {
    player = await Player.findOne({ nickname: playerIdOrNickname });
  }

  if (player) {
    player.set(updatePlayer);
    return player.save();
  }
};

/**
 * Delete a player by his ID or his nickname
 * @param playerIdOrNickname
 * @returns the deleted player
 */
const deletePlayer = (playerIdOrNickname: string) => {
  if (PlayerUtils.isValidObjectid(playerIdOrNickname)) {
    return Player.findByIdAndDelete(playerIdOrNickname);
  } else {
    return Player.findOneAndDelete({ nickname: playerIdOrNickname });
  }
};

/**
 * Delete all the players
 * @returns the list of deleted players.
 */
const deleteAllPlayers = () => {
  return Player.deleteMany();
};

export default {
  createPlayer,
  getPlayer,
  getAllPlayers,
  updatePlayer,
  deletePlayer,
  deleteAllPlayers
};
