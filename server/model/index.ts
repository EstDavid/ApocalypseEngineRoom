import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const MONGO_DB_URI = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' ?
  process.env.DATABASE_REMOTE_TEST : process.env.DATABASE_REMOTE;

const db = mongoose.connection;

const files = fs.readdirSync(__dirname);


// function startServer () {
//   main().catch(err => console.log(err));

//   async function main () {
//     if (!MONGO_DB_URI) {
//       throw new Error('No database uri provided');
//     }
//     await mongoose.connect(MONGO_DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   }
// }

// startServer();

// for (let file of files) {
//   if (file !== 'index.js') {
//     const model = require(path.join(__dirname, file))(mongoose);
//     db[model.name] = model.model;
//   }
// }

// module.exports = db;