import mongoose, { Document } from 'mongoose';

interface IQuestion extends Document {
  question: string;
  category: string; // TODO : enum 처리 여기랑 히스토리
  answer?: string;
}

const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    question: { type: String, required: true },
    category: { type: String, required: true },
    answer: { type: String },
  },
  { timestamps: true }
);

QuestionSchema.index({ category: 1 });

export default mongoose.model('StudyFor1010', QuestionSchema);
