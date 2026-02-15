const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

/**
 *  - POST /api/account
 * -  create new account
 * -  protected Route
 */
router.post("/",authMiddleware.authMiddleware,accountController.createAccountController)



module.exports = router