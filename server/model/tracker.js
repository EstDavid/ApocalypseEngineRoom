module.exports = (mongoose)  => {
  const trackerSchema = new mongoose.Schema({
    "name": String,
    "system": String,
    "playbook": String,
    "description": String,
    "value": mongoose.Schema.Types.Mixed
  });
  const model  = new mongoose.model("tracker", trackerSchema);
  return {name: "tracker", model: model};
};