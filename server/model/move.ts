import mongoose from 'mongoose';

const moveSchema = new mongoose.Schema({
  name: String,
  system: String,
  playbook: String,
  description: String,
  isAvailable: Boolean,
  isRoll: Boolean,
  mod: mongoose.Schema.Types.Mixed
});

const Move = mongoose.model('Move', moveSchema);

export default Move;