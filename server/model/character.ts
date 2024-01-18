import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: String,
  system: String,
  playbook: String,
  charDescription: String,
  moves: [
    {
      isAvailable: Boolean,
    }
  ],
  trackers: [
    {
      value: mongoose.Schema.Types.Mixed
    }
  ],
  stats: [{ name: String, value: Number }],
  owner: String,
  notes: String
});

const Character = mongoose.model('Character', characterSchema);

export default Character;