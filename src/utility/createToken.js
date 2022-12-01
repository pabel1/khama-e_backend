const  jwt =require("jsonwebtoken")
 const jwtHandle =async ({email,_id})=>{
    // console.log(email)
    // console.log(_id)
    const token = jwt.sign(
        {
          email:email,
          userId:_id,
        },
        process.env.JWT_TOKEN,
        {
          expiresIn: "2d",
        }
      );
      return token;
}

module.exports=jwtHandle;