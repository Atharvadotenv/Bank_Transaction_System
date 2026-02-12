const express =  require("express");
const authRouter = require("../src/routes/auth.routes")
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json())

app.use("/api/auth",authRouter);


module.exports = app;


// creation of server 
// and configure the server