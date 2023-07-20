const userModel = require("../model/usermodel");

let verifyOtp = async (req, res) => {
  try {
    let userOtp = req.body.otp;
    // Get the OTP entered by the user from the request body
    let verifiedOtp = await userModel.findOne({
      $and: [{ email: req.body.email }, { code: userOtp }],
    });
    console.log(userOtp);
    if (verifiedOtp) {
      (verifiedOtp.code = null), (verifiedOtp.verified = true);
      verifiedOtp.save();
      return res.json("verified");
    } else {
      return res.status(400).json("otp is incorrect");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { verifyOtp };
