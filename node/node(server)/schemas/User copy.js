const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({

   loginid: {
    type:String,
    unique: true,
    required: true,
  },
    Names: {
      type: String,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: String,
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  /////////////////////////////
  department: {
   type:String
  }, //부서
  //입사일
  register: {
  type:Date
  },
  rank: {
      type:String
  },
  name: {
    type:String  
  }
});
module.exports = mongoose.model("User", userSchema);