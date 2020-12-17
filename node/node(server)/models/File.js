var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
const ProfileSchema = new mongoose.Schema({
    profileImage:{
        type:String,
    }
});
var Profile = connection.model('Profile', ProfileSchema);
module.exports = Profile;