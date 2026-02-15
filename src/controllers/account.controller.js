const accountModel = require("../models/account.model");

async function createAccountController(req,res)
{
    const user = req.user ;

    const account = await accountModel.create({
        user: user._id
    })
    return res.status(201).json({
        message:" Account Created Sucessfully"
        ,account
    })
}

module.exports = {createAccountController};