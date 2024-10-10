import express from 'express';

import {
  getRandomQuestion,
  getRandomFor1010,
} from '../controllers/randomQuestionController';

const router = express.Router();

// router.get('/random-question', getRandomQuestion);
router.get('/random-question', getRandomFor1010);

export default router;
