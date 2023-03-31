import Joi from 'joi';
import type { ObjectSchema } from 'joi';
import type { NextFunction, Request, Response } from 'express';
import type { IPlayer } from '../models/Player';
import Logging from '../utils/Logger';

/**
 * Validate body of the request.
 * @param schema 
 */
export const playerValidate = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(400).json({ error });
    }
  };
};

/**
 * Schema for the request of player.
 */
export const playerSchema = {
  create: Joi.object<IPlayer>({
    nickname: Joi.string().required(),
    score: Joi.number().optional()
  }),
  update: Joi.object<IPlayer>({
    score: Joi.number().required()
  })
};
