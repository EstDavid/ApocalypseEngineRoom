const mongoose = require('mongoose')
const path  = require("path")
const fs = require('fs')

const db = {}

const files = fs.readdirSync(__dirname)

function startServer() {
  main().catch(err => console.log(err));

  async function main() {
      await mongoose.connect('mongodb+srv://danayachini:...ItsAllForYou.@d-cluster.yxwcju1.mongodb.net/RPG_DB');
  }
}

startServer()

for(let file of files) {
  if(file !== 'index.js') {
    const model = require(path.join(__dirname, file))(mongoose)
    db[model.name] = model.model
  } 
}

module.exports = db