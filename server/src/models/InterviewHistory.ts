import mongoose, { Document } from 'mongoose';

interface IInterviewHistory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  questionId: mongoose.Schema.Types.ObjectId;
  questionType: string;
  askedAt: Date;
}

const InterviewHistorySchema = new mongoose.Schema<IInterviewHistory>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  // TODO : enum 처리 여기랑 질문의 카테고리 모두
  questionType: { type: String, required: true },
  askedAt: { type: Date, default: Date.now },
});

InterviewHistorySchema.index({ askedAt: 1 });

export default mongoose.model('InterviewHistory', InterviewHistorySchema);
