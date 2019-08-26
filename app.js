const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const con = require("./database/db.js")
const expressValidator = require("express-validator");
//imports route
const customerRoutes = require('./routes/customer');
var _ = require('underscore');

// force: true will drop the table if it already exists
/*con.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});*/
/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'tshirtshop'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

/*app.use(function(req, res, next) {
  req.con = con
  next()
})*/
// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());


//app.get("/", (req, res) => {
    //res.send("hello from node");
//});

// routes middleware
app.use("/api", customerRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});