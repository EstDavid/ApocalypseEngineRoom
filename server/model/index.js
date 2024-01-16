const mongoose = require('mongoose')
const path  = require("path")
const fs = require('fs')
require('dotenv').config()

const db = {}

const files = fs.readdirSync(__dirname)

function startServer() {
  main().catch(err => console.log(err));

  async function main() {
      await mongoose.connect(process.env.MOMGO_CONNECTION);
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