import mongoose from 'mongoose';

const LikedSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },          
  mediaId: { type: String, required: true },           
  mediaType: { type: String, enum: ['movie', 'tv'], required: true },
  addedAt: { type: Date, default: Date.now },
});


const LikedB = mongoose.model('Liked', LikedSchema);
export default LikedB;
