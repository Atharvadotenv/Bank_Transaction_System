const express =  require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json())

/*   
 Routes Created --
*/
const authRouter = require("../src/routes/auth.routes")
const accountRouter = require("../src/routes/account.routes");

/*   
 Routes -- used
*/
app.use("/api/accounts",accountRouter);
app.use("/api/auth",authRouter);



module.exports = app;


// creation of server 
// and configure the server