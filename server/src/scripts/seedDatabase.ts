import CONFIG from '../config';
import Question from '../models/Question';
import mongoose from 'mongoose';
import { StudyFor1010 } from '../assets/studyfor1010';

async function insertMockData() {
  try {
    await mongoose.connect(CONFIG.DB.HOST);
    console.log('DB에 연결되었습니다.');

    const result = await Question.insertMany(StudyFor1010);
    console.log(`${result.length}개의 질문이 성공적으로 삽입되었습니다.`);
  } catch (error) {
    console.error('데이터 삽입 중 오류 발생:', error);
  } finally {
    await mongoose.disconnect();
  }
}

insertMockData();
