const data = {
  질문리스트: 1,
};

export const getRandomQuestion = (req, res, next) => {
  const question = data;
  res.status(200).json(question);
};
