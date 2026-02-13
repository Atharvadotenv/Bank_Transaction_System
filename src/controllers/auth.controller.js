const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const  emailService = require("../services/email.service")
/* 
* User register Controller
* POST /api/auth/register

*/

async function userRegisterController(req,res)
{
    const {email,name , password} = req.body;
    const isExists = await userModel.findOne({
        email:email
    })

    if(isExists)
    {
        return res.status(422).json({
            message: " User Already exists With this Email"
            ,status:"failed"
        })
    }

    const user = await userModel.create({
        email , name , password
    })
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token_jwt",token);

    res.status(201).json({
        user:{
            _id: user._id,
            email:user.email,
            name:user.name  
        },
        token
    })
    await emailService.sendRegistrationEmail(user.email, user.name);

}

// POST /api/auth/login
async function userloginController(req,res)
{
    const {email , password} = req.body;
    const user = await userModel.findOne({
        email
    }).select("+password")
    if(!user)
    {
        return res.status(401).json({
            message:"Email or Password is Invalid"
        })
    }
   const isValidPassword = await user.comparePassword(password)
   if(!isValidPassword)
   {
     return res.status(401).json({
        message:" Password is Invalid"
     })
   }
     const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token_jwt",token);

    res.status(200).json({
        user:{
            _id: user._id,
            email:user.email,
            name:user.name  
        },
        token
    })



}

module.exports = {
    userRegisterController,userloginController
}