const mongoose = require('mongoose')
const path  = require("path")
const fs = require('fs')
// require('dotenv').config()
console.log(process.env.DATABASE_URL);
const MONGO_DB_URI = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' ?
process.env.DATABASE_REMOTE_TEST : process.env.DATABASE_REMOTE;

const db = {}

const files = fs.readdirSync(__dirname)

function startServer() {
  main().catch(err => console.log(err));

  async function main() {
      await mongoose.connect(MONGO_DB_URI);
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