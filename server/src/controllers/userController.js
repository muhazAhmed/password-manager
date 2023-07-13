const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const valid = require("../utils/validations");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//=========== Generate OTP ==================
function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function sendMail(email, code) {
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.OUTLOOK_MAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.OUTLOOK_MAIL,
    to: email,
    subject: "OTP Verification",
    html: `
      <div style="background-color: #f1f1f1; padding: 20px;">
        <h2 style="color: #333333;">OTP Verification</h2>
        <p style="color: #555555;">Dear User,</p>
        <p style="color: #555555;">Your one-time password is:</p>
        <h3 style="color: #007bff; margin-top: 10px;">${code}</h3>
        <p style="color: #555555;">Please enter this OTP to proceed with the verification process.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending OTP");
    } else {
      console.log("OTP sent successfully");
    }
  });
}

//=========== Register user ==================
const register = async (req, res) => {
  try {
    let data = req.body;
    const { firstname, lastname, email, phone, password, profile } = data;

    if (!firstname) {
      return res.status(400).json("Please enter first name");
    }
    if (!lastname) {
      return res.status(400).json("Please enter last name");
    }

    //==================> Email validation <=======================
    if (!email) {
      return res.status(400).json("Please enter email");
    }
    if (!valid.isValidEmail(email)) {
      return res.status(400).json("Email is invalid");
    }

    //<===================
    let checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      if (checkEmail.verified == true) {
        return res.status(400).json("Email already register");
      } else {
        let code = generateOTP();
        sendMail(email, code);
        let updata = await userModel.findOneAndUpdate(
          { email },
          { code: code },
          { new: true }
        );
        return res.status(200).json(updata);
      }
    }
    // Generate a random 4 digit OTP
    req.body.code = generateOTP();
    sendMail(email, req.body.code);
    // Send the OTP to the user's email address

    //==================> Phone validation <=======================
    if (!phone) {
      return res.status(400).json("Please enter phone number");
    }
    if (!valid.isValidMobile(phone)) {
      return res.status(400).json("Phone number is invalid");
    }

    //<===================
    const dublicatePhone = await userModel.findOne({ phone });
    if (dublicatePhone) {
      return res.status(400).json(" Number Already Exists");
    }

    //==================> password validation <=======================
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    if (!valid.isValidPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
        );
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.code = generateOTP();
    sendMail(email, req.body.code);
    
    let savedData = await userModel.create(data);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> Login user <=======================

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    const { email, password } = data;

    if (!email) {
      return res.status(400).json("Please enter email address");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }

    let getUser = await userModel.findOne({ email });
    if (!getUser)
      return res.status(401).json("Email or Password is incorrect.");

    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword)
      return res.status(401).json("Email or Password is incorrect.");

    //token
    const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds
    const token = jwt.sign(
      {
        userId: getUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: oneDayInSeconds }
    );

    const { newPassword, ...other } = getUser;
    let User = getUser;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: oneDayInSeconds * 1000, // maxAge expects milliseconds
      })
      .status(200)
      .json({ User, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> Update user <=======================
const updateUser = async (req, res) => {
  try {
    let data = req.body;
    const { firstname, lastname, email, phone, password, profile } = data;

    if (email) {
      if (!valid.isValidEmail(email)) {
        return res.status(400).json("Email is invalid");
      }

      //========= Checking for duplicate email  ===========
      const dublicateEmail = await userModel.findOne({
        where: { email: email },
      });
      if (dublicateEmail) {
        return res.status(400).json(" Email Already Exists");
      }
    }

    if (phone) {
      if (!valid.isValidMobile(phone)) {
        return res.status(400).json("Phone number is invalid");
      }

      //========= Checking for duplicate phone  ===========
      const dublicatePhone = await userModel.findOne({
        where: { phone: phone },
      });
      if (dublicatePhone) {
        return res.status(400).json(" Phone number Already Exists");
      }
    }

    if (password) {
      if (!valid.isValidPassword(password)) {
        return res
          .status(400)
          .json(
            "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
          );
      }

      //========= Hashing the password =========
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await userModel.updateOne({ _id: req.params.id }, { $set: data });
    return res
      .status(200)
      .json("You have recently updated your " + Object.keys(data));
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//==================> Logout user <=======================
const logout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json("User has been logged out. ");
};

//==================> Delete user <=======================
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { register, loginUser, logout, deleteUser, updateUser };
