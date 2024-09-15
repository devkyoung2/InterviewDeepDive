import mongoose, { Document } from 'mongoose';

interface IQuestion extends Document {
  questionId: number;
  question: string;
  category: string; // TODO : enum 처리 여기랑 히스토리
  answer?: string;
}

const QuestionSchema = new mongoose.Schema<IQuestion>({
  questionId: { type: Number, unique: true },
  question: { type: String, required: true },
  category: { type: String, required: true },
  answer: { type: String },
});

QuestionSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastQuestion = (await this.model('Question')
      .findOne()
      .sort({ questionId: -1 })) as IQuestion | null;

    if (lastQuestion && typeof lastQuestion.questionId === 'number') {
      this.questionId = lastQuestion.questionId + 1;
    } else {
      this.questionId = 1;
    }
  }
  next();
});

QuestionSchema.index({ questionId: 1, category: 1 });

export default mongoose.model('Question', QuestionSchema);
