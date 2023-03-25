import express from 'express';
import type { Router } from 'express';
import playerController from '../controllers/PlayerController';
import { playerValidate, playerSchema } from '../middleware/PlayerRequestValidator';

const router: Router = express.Router();

router.post('/', playerValidate(playerSchema.create), playerController.createPlayer);
router.get('/', playerController.getAllPlayers);
router.delete('/', playerController.deleteAllPlayers);
router.get('/:playerIdOrNickname', playerController.getPlayer);
router.put('/:playerIdOrNickname', playerValidate(playerSchema.update), playerController.updatePlayer);
router.delete('/:playerIdOrNickname', playerController.deletePlayer);

export default router;
