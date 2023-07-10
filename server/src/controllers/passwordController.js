// const userModel = require('./userModel'); // Import the User model
const passwordModel = require("../models/passwordModel"); // Import the Password model
const passwordGenerator = require("generate-password");
var CryptoJS = require("crypto-js");
const moment=require("moment");
const valid = require("../utils/validations");

const createPasswordDB = async (req, res) => {
  try {
    let data = req.body;
    let {userId, siteName,siteLink, password } = data;

    if (!siteName) {
      return res.status(400).json("Please enter Site Name");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }
    if (siteLink) {
      if (!valid.isValidURL(siteLink)) {
        return res.status(400).json("Please enter valid link");
      }
    }

    req.body.password = CryptoJS.AES.encrypt(password, process.env.dcryptPassword).toString();
  
    const savedData = await passwordModel.create(data);
    return res.status(201).json( savedData );
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPasswords = async (req, res) => {
  try {
    const userPasswords = await passwordModel.find({ userId: req.params.id });

    const decryptedPasswords = userPasswords.map((item) => {
      let decryptedPassword;
      const bytes = CryptoJS.AES.decrypt(
        item.password,
        process.env.dcryptPassword
      );
      
      decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      return {
        siteName: item.siteName,
        siteLink: item.siteLink,
        date: moment(item.createdAt).format("MM/DD/YYYY"),
        decryptedPassword: decryptedPassword,
      };
    });

    return res.status(200).json(decryptedPasswords);
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
      if (numbers == true) {
        obj.numbers = true;
      }
      if (upperCase == false) {
        obj.uppercase = false;
      }
      if (lowerCase == false) {
        obj.lowercase = false;
      }
      if (specialChar == true) {
        obj.symbols = true;
      }
      var password = passwordGenerator.generate(obj);
    }
    
    if (numbers === false && upperCase === false && lowerCase === false && specialChar === false) {
        obj.numbers = true;
        obj.symbols = true;
        var password = passwordGenerator.generate(obj);
    }
    res.status(201).json(password);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message);
  }
};

module.exports = { createPasswordDB, getPasswords, generatePassword };
