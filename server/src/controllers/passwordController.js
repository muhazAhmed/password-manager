// const userModel = require('./userModel'); // Import the User model
const passwordModel = require("../models/passwordModel"); // Import the Password model
const pass = require("generate-password");

const passwordManger = async (req, res) => {
  try {
    let data = req.body;
    let { userId, siteName, password } = data;

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
    let data = req.body;
    let {numbers, upperCase, lowerCase, specialChar} = data;
    let obj = {length:req.body.length};
    if (
      numbers === true ||
      upperCase === true ||
      lowerCase === true ||
      specialChar === true
    ) {
      if (req.body.numbers == true) {
        obj.numbers = true;
      }
      if (req.body.upperCase == false) {
        obj.uppercase = false;
      }
      if (req.body.lowerCase == false) {
        obj.lowercase = false;
      }
      if (req.body.specialChar == true) {
        obj.symbols = true;
      }
      var password = pass.generate(obj);
    }
    
    if (numbers === false && upperCase === false && lowerCase === false && specialChar === false) {
        obj.numbers = true;
        obj.symbols = true;
        var password = pass.generate(obj);
    }
    res.status(201).json(password);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message);
  }
};
module.exports = { passwordManger, getPasswords, generatePassword };
