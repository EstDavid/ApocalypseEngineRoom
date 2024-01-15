const express = require("express");
const router = require("./router")
var cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('../client'))
app.use('/', router)


const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});