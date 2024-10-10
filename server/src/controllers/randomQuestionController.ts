import Question from '../models/Question';

export const getRandomQuestion = async (req, res, next) => {
  try {
    const question = await Question.aggregate([{ $sample: { size: 1 } }]);

    if (!question || !question.length) {
      console.log(question);

      return res.status(404).json({ message: '질문을 찾을 수 없습니다.' });
    }

    res.status(200).json(question[0]);
  } catch (error) {
    next(error);
  }
};

export const getRandomFor1010 = async (req, res, next) => {
  try {
    const question = await Question.aggregate([{ $sample: { size: 1 } }]);

    if (!question || !question.length) {
      console.log(question);

      return res.status(404).json({ message: '질문을 찾을 수 없습니다.' });
    }

    res.status(200).json(question[0]);
  } catch (error) {
    next(error);
  }
};
