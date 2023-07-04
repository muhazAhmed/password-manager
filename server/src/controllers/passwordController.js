// const userModel = require('./userModel'); // Import the User model
const passwordModel = require("../models/passwordModel"); // Import the Password model
const pass = require("generate-password");

const passwordManger = async (req, res) => {
  try {
    let data = req.body;
    let { userId, password } = data;

    const savedData = await passwordModel.create(data);
    return res.status(201).json({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPasswords = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const generatePassword = async (req, res) => {
  try {
    let obj = {length:req.body.length};
    if (req.body.numbers == true) {
      obj.numbers = true;
    }
    if (req.body.upper == false) {
      obj.uppercase = false;
    }
    if (req.body.lower == false) {
      obj.lowercase = false;
    }
    if (req.body.specialChar == true) {
      obj.symbols = true;
    }
    var password = pass.generate(obj);
    console.log(password)
    res.status(201).json(password);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { passwordManger, getPasswords, generatePassword };
