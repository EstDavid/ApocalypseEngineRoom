module.exports = (mongoose)  => {
  const moveSchema = new mongoose.Schema({
    "name": String,
    "system": String,
    "playbook": String,
    "description": String,
    "isAvailable": Boolean,
    "isRoll": Boolean,
    "mod": mongoose.Schema.Types.Mixed
  });
  const model  = new mongoose.model("move", moveSchema);
  return {name: "move", model: model};
};