// const userModel = require('./userModel'); // Import the User model
const passwordModel = require("../models/passwordModel"); // Import the Password model
const pass = require("generate-password");
let a =/^www\.[a-z0-9-]+(?:\.[a-z0-9-]+)*\.+(\w)*/
var CryptoJS = require("crypto-js");
const moment=require("moment")


const passwordManger = async (req, res) => {
  try {
    let data = req.body;
    let { siteName,siteLink, password } = data;
    if (!siteName) {
      return res.status(400).json("Please enter siteName");
    }
    if (!siteLink) {
      return res.status(400).json("Please enter siteLink");
    }
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    if(!(a.test(siteLink))){
      return res.status(400).json("Please enter valid link");
    }

    req.body.password = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
  
    const savedData = await passwordModel.create(data);
    return res.status(201).json( savedData );
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPasswords = async (req, res) => {
  try {
     const userPasswords = await passwordModel.find({userId:req.params.id})


     userPasswords.map((data,index)=>{
     return res.status(200).json({siteName:data.siteName})
  })


    //  let bytes  = CryptoJS.AES.decrypt(userPasswords.password, 'secret key 123');
    //  let data={
    //   siteName:userPasswords.siteName,
    //   siteLink:userPasswords.siteLink,
    //   password:bytes.toString(CryptoJS.enc.Utf8),
    //   date:moment(userPasswords.createdAt).format('MM/DD/YYYY')
    //  }
    //  return res.status(200).json(userPasswords)

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
