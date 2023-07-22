const userModel = require("../models/userModel");

const verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const userId = req.body.userId;
    console.log("OTP : " + otp);
    console.log("userID : " + userId);

    // Find the user by their ID in the database
    const user = await userModel.findById(userId);

    if (!user) {
      // If the user with the given ID is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided OTP matches the one stored in the database
    if (otp === user.otp.toString()) {
      // If the OTP is correct, update the 'verified' field in the user document to true
      user.verified = true;
      await user.save();

      return res.status(200).json("OTP verified successfully" );
    } else {
      return res.status(400).json( "Invalid OTP, Try again" );
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { verifyOtp };
