import CONFIG from './config';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(helmet());

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
