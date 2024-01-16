module.exports = (mongoose)  => {
    const characterSchema = new mongoose.Schema({
        "name": String,
        "system": String,
        "playbook": String,
        "charDescription": String,
        "moves": [
            {
                "isAvailable": Boolean,
            }
        ],
        "trackers": [
            {
                "value": mongoose.Schema.Types.Mixed
            }
        ],
        "stats": [{"name": String, "value": Number}],
        "owner": String,
        "notes": String
    })
    const model  = new mongoose.model("character", characterSchema)
    return {name: "character", model: model}
}