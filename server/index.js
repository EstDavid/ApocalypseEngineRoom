const express = require("express");
require('dotenv').config();
const router = require("./router");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(cookieParser());
app.use(session({secret: process.env.SECRET}));

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_ORIGIN,
  exposedHeaders: ['set-cookie']
}));
app.use(express.json());

app.use(router);

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});