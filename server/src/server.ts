import CONFIG from './config';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from './routes/index';

const app = express();

app.use(express.json());
app.use(helmet());

// 중앙 라우터 설정
app.use('/api', router);

// 404 에러 핸들러
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 글로벌 에러 핸들러
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
);

// TODO : 에러처리
const connectDB = async () => {
  return mongoose.connect(CONFIG.DB.HOST);
};

// DB 연결됐을 경우에만 서버 가동
connectDB() //
  .then(() => {
    console.log('success DB connected');
  })
  .then(() =>
    app.listen(CONFIG.DB.PORT, () =>
      console.log(`Server running on port ${CONFIG.DB.PORT}`)
    )
  );
