const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profile : {
        type : String,
        default : "https://shorturl.at/jlmO8"
    },
    code:Number,
    verified:{
        type:String,
        default :false
    }

}, {timestamps:true}
)
module.exports = mongoose.model("User", userSchema)