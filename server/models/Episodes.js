import mongoose from 'mongoose';

const EpispdesSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },          
  episodeId:{ type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const Episodes = mongoose.model('Episodes', EpispdesSchema);
export default Episodes;
