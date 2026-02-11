const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const  userSchema = new mongoose.Schema({
 
    email:{
        type:String,
        required:[true,"Email is require for creating a user"],
        trim:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] , // to check the format of the email using regex
        unique:[true,"Email Already Exists"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating Account"]
    },
    password:{
        type:String,
        required:[true,"Password is required for creating An account"],
        minlength: [6,"Password Should be contain more than 6 Characters"],
        select:false  // Bydefault password will not be fetched to any query
    }
    

},{
    timestamps:true
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        return next;
    }
    const hash = await bcrypt.hash(this.password,10);
    return next(); 

})
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema);

module.exports=userModel;