const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
// const userRegiQuery = require("../../Services/usersServices/userRegiQuery");

const jwtHandle = require("../utility/createToken");
const regiQuery = require("../Services/userQuery/regiQuery");
// const userLoginQuery = require("../../Services/usersServices/userLoginQuery");
// const loggedUserQuery = require("../../Services/usersServices/loggedUserQuery");
// const updateProfileQuery = require("../../Services/usersServices/updateProfileQuery");

// registation
const regiController = async (req, res) => {
  const { firstname, lastname, email, password, address, mobile, photo } =
    req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    res.status(500).json({
      status: "failed",
      message: "Email already exist!",
    });
  } else {
    try {
      if (firstname && lastname && email && mobile && address && photo) {
        let result = await regiQuery(req, UserModel);
        const { email, _id } = result;

        const token = await jwtHandle({ email, _id });
        console.log(result);
        if (!result) {
         throw new error;
        }else{
          res.status(200).json({
            status: "success",
            data: result,
            acces_token: token,
          });
        }
      } else {
        res.status(400).json({
          status: "failed",
          message: "All fields are Required!",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
};

// login
const loginController = async (req, res) => {
  try {
    const user = await userLoginQuery(req, UserModel);

    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // console.log(user)
        const { email, _id } = user[0];
        // console.log(email);
        const token = await jwtHandle({ email, _id });
        res.status(200).json({
          status: "success",
          userData: user,
          access_token: token,
          message: "Login Success",
        });
      } else {
        res.status(401).json({
          status: "failed",
          message: "Authentication failed!",
        });
      }
    } else {
      res.status(401).json({
        status: "failed",
        message: "User Not Exist!",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Authentication failed!",
    });
  }
};

// logged user Details
const loggedUserController = async (req, res) => {
  try {
    const user = await loggedUserQuery(req, UserModel);
    // console.log(user);
    // if(user && user.length >0){

    // }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    if (req.body) {
      console.log(req.body);
      const updateData = await updateProfileQuery(req, UserModel);
      res.status(200).json({
        status: "success",
        data: updateData,
        message: "Update Success!",
      });
    } else {
      res.status(500).json({
        status: "failed",
        message: "Data Require!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "SomeThing Wrong!",
    });
  }
};

module.exports = {
  regiController,
  loginController,
  loggedUserController,
  updateProfileController,
};
