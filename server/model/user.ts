import mongoose from 'mongoose';

interface IUser {
  name: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;