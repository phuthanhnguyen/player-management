import mongoose from 'mongoose';
import type { IPlayer } from '../models/Player';

export default class PlayerUtils {
  /**
   * Rank every player in the list
   * @param players list of players in the competition
   */
  public static rankingPlayers = (
    players: (IPlayer & {
      _id: mongoose.Types.ObjectId;
    })[]
  ) => {
    // Init the previous rank to 1
    let previousRank: number | undefined = 1;

    // Sort list of players in desc order of score
    players.sort((player1, player2) => player2.score - player1.score);

    // Set rank for each player
    for (let i = 0; i < players.length; i++) {
      if (i === 0) {
        // For the first player of the list, his rank is 1
        players[i].rank = 1;
      } else if (players[i].score === players[i - 1].score) {
        // From the second player of the list, if his score is the same with the previous player,
        // he has the same rank as previous rank
        players[i].rank = previousRank;
      } else {
        // Otherwise, his rank is the index of the player in the list plus 1
        players[i].rank = i + 1;
        previousRank = players[i].rank;
      }
    }
  };

  public static isValidObjectid(id: string) {
    return id.match(/^[0-9a-fA-F]{24}$/) !== null;
  }
}
