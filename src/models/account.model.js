const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref : "user",
        required: [true , "Account must be associated With the user"]
        ,index:true   // for better optimization 
                       // MongoDb uses B+Tree algorithm         
    },
    status:{
        type:String,
        enum:["ACTIVE", "FROZEN", "CLOSED"],
        message:"Status can be either ACTIVE , FROZE or CLOSED",
        default:"ACTIVE"
    },

    currency:{
        type:String,
        required:[true,"Currency is required For creating an Account"],
        default:"INR"
    }

},{
    timestamps:true
})

// to find user According to status 
accountSchema.index({user:1,status:1})
// this is called as Compound index because we are putting index on more than one fields

// Balance is never Stored inside a Database 
// we store Balance in Cache 
const accountModel =  mongoose.model("account",accountSchema)

module.exports = accountModel;