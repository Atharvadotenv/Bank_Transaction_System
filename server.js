require("dotenv").config()

const app = require("../Backend/src/app");
const ConnectToDB= require("../Backend/src/config/db")
ConnectToDB();
app.listen(3000,()=>{

    console.log("Server is running on Port 3000");
    

})