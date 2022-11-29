const express = require("express");
const router = express.Router();


const userRouter=require("./userRouter")
const productRouter=require("./productRouter")
const orderRouter=require("./orderRouter")
const paymentRouter=require("./paymentRouter")



router.use("/user",userRouter)

router.use("/product",productRouter)
router.use("/order",orderRouter)
router.use("/payment",paymentRouter)

module.exports = router;