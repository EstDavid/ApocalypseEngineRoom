module.exports = (mongoose)  => {
  const playbookSchema = new mongoose.Schema({
    "name": String,
    "systemName": String,
    "available_at": String,
    "madeBy": String,
    "statOptionsText": String,
    "movesText": String,
    "playingThis": [String],
    "description": [String],
    "statsOptions" : [[{"name": String, "value": Number}]]
  });
  const model  = new mongoose.model("playbook", playbookSchema);
  return {name: "playbook", model: model};
};