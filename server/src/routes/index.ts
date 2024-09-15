import express from 'express';

import { getRandomQuestion } from '../controllers/randomQuestionController';

const router = express.Router();

router.get('/random-question', getRandomQuestion);

export default router;
