const express= require("express");
const { regiController } = require("../Controller/userController");
const router=express.Router();

// user regi route
router.post("/registation",regiController);

module.exports=router;