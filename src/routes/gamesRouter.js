import { Router } from 'express'
import validateSchema from '../middlewares/validateSchema.js'
import gameSchema from '../schemas/gameSchema.js'
import { insertNewGame, getGames } from '../controllers/games.js'

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateSchema(gameSchema), insertNewGame);

export default gamesRouter;