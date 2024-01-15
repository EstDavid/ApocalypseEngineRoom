const express = require("express");
const router = require("./router")
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(cookieParser());
app.use(session({secret: "Temporary Secret"}));
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:5173',
  exposedHeaders: ['set-cookie']
}))
app.use(bodyParser.json())
app.use(express.static('../client'))

app.use('/', router)


const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});