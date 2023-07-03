// const userModel = require('./userModel'); // Import the User model
const passwordModel = require('../models/passwordModel'); // Import the Password model
const pass = require('generate-password');

const passwordManger = async (req, res) => {
    try {
        let data = req.body;
        let {userId, password} = data

        const savedData = await passwordModel.create(data)
        return res.status(201).json({ data: savedData })
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getPasswords = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const generatePassword = async (req,res)=>{
    try {
        var password = pass.generate({
            length: 8,
            numbers: true,
        });
        res.status(201).json(password)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports = {passwordManger, getPasswords,generatePassword}

