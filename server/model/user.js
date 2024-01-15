module.exports = (mongoose)  => {
    const userSchema = new mongoose.Schema({
        "name": {type: String, required: true},
        "password": {type: String, required: true}
    })
    const model  = new mongoose.model("user", userSchema)
    return {name: "user", model: model}
}