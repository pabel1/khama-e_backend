const bcrypt = require("bcrypt");
const regiQuery = async (req, UserModel) => {
  
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashPassword,
      address:req.body.address,
      photo: req.body.photo,
    });
    let userData= await user.save();
   
    return userData

  } catch (error) {
    return false;
  }
};
module.exports= regiQuery;