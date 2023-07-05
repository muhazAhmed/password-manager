const mongoose = require('mongoose');

// Define the password schema
const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  siteName: {
    type: String,
    required: true
  },
  siteLink: {
    type: String,
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps:true}
);

module.exports =  mongoose.model('Password', passwordSchema);
