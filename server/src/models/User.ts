import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  userId: string;
  password: string;
  email: string;
  username: string;
  lastLogin: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    userId: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

UserSchema.index({ username: 1, email: 1 });

export default mongoose.model('User', UserSchema);

``;
