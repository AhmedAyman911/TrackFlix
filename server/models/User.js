import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  token: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
