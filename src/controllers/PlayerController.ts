import type { Request, Response } from 'express';
import PlayerServices from '../services/PlayerServices';
import Logger from '../utils/Logger';

const createPlayer = (req: Request, res: Response) => {
  const { nickname, score } = req.body;

  PlayerServices.createPlayer(nickname, score)
    .then((player) => res.status(201).json(player))
    .catch((error) => {
      Logger.error(error);
      if (error.code === 11000) {
        return res.status(400).json({
          Message: `Duplicate key error on [${JSON.stringify(error.keyValue)}]`
        });
      }
      return res.status(500).json({ error });
    });
};

const getPlayer = (req: Request, res: Response) => {
  const { playerIdOrNickname } = req.params;

  PlayerServices.getPlayer(playerIdOrNickname)
    .then((player) => {
      if (player) {
        return res.status(200).json(player);
      } else {
        return res.status(404).json({
          message: `Player with id or nickname [${playerIdOrNickname}] not found!`
        });
      }
    })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ error });
    });
};

const getAllPlayers = (req: Request, res: Response) => {
  PlayerServices.getAllPlayers()
    .then((players) => res.status(200).json(players))
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json(error);
    });
};

const updatePlayer = (req: Request, res: Response) => {
  const { playerIdOrNickname } = req.params;

  PlayerServices.updatePlayer(playerIdOrNickname, req.body)
    .then((player) => {
      if (player) {
        return res.status(200).json(player);
      } else {
        return res.status(404).json({
          message: `Player with id or nickname [${playerIdOrNickname}] not found!`
        });
      }
    })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ error });
    });
};

const deletePlayer = (req: Request, res: Response) => {
  const { playerIdOrNickname } = req.params;

  PlayerServices.deletePlayer(playerIdOrNickname)
    .then((player) => {
      if (player) {
        return res.status(200).json({ message: `Player with id [${playerIdOrNickname}] deleted!` });
      } else {
        return res.status(404).json({
          message: `Player with id [${playerIdOrNickname}] not found!`
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAllPlayers = (req: Request, res: Response) => {
  PlayerServices.deleteAllPlayers()
    .then(() => res.status(200).json({ message: 'All players were deleted' }))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createPlayer,
  getPlayer,
  getAllPlayers,
  updatePlayer,
  deletePlayer,
  deleteAllPlayers
};
