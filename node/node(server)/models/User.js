const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  profileImage:{
    type:String,
},
imageName: {
  type: String,
  default: "none",
 // required: true
},

imageData: {
  type: String
  //default: "none"
 // required: true
},
  meta_data:{},
  imageUrl: {   
    type:String
  },
   loginid: {
    type: String,
    unique: true,
    required: true,
  },
    Names: {
      type: String,
      maxlength: 50,
    },
    rank: {
      type:String,
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
    reason: {
     type:String 
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
  },
  salt: {
    type: String,
    required: true
  },
});
module.exports = mongoose.model("User", userSchema);