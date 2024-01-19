import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema({
  name: String,
  system: String,
  playbook: String,
  description: String,
  value: mongoose.Schema.Types.Mixed
});

const Tracker = mongoose.model('Tracker', trackerSchema);

export default Tracker;