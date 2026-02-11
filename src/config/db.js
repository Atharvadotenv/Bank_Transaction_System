const mongoose = require("mongoose");

function ConnectToDB(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Server Is Connected to DB");
        
    })
    .catch(err=>{
        console.log("Error Connecting To Database");
        process.exit(1);
        
    });
}
module.exports= ConnectToDB;