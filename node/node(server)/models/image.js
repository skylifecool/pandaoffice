var mongoose = require('mongoose');
Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
var ImageSchema = new Schema({

    imageName: {
        type: String,
        default: "none",
        required: true
    },
    
    imageData: {
        type: String,
        required: true
    }
});

var Image = connection.model('Image', ImageSchema);
module.exports = Image;