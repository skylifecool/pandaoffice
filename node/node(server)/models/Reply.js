var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
autoIncrement.initialize(connection);



var replySchema = new Schema({

  imageName: {
    type: String,
    default: "none",
   // required: true
  },
  
  imageData: {
    type: String,
    default: "none"
   // required: true
  },
  reply_id : {
   type: Number,
   primaryKey: true,
   autoIncrement: true,
   allowNull : false,
 },
 board1_id: {
  type: Number,
  allowNull : false
 },
 loginid: {
  type: String,
  allowNull : false,
  ref : 'User'
 },
 Names: {
  type: String,
  allowNull : false,
  ref : 'User'
 },
 rank: {
  type: String,
  allowNull : false,
  ref : 'User'
 },
 contents: {
  type: String,
 },
 date: {
  type:Date,
  allowNull : false,
  default:Date.now
 }
});

replySchema.plugin(autoIncrement.plugin,{ 
    model : 'formSchema', 
    field : 'reply_id', 
    startAt : 1, //시작 
    increment : 1 // 증가 });
    });     
var Reply = connection.model('Reply', replySchema);
module.exports = Reply;

