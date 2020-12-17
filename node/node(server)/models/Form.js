
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
autoIncrement.initialize(connection);

var formSchema = new Schema({

payer:[
{payerNames:{type:String}},
{payerank:{type:String}},
{payerstatus:{type:String}},
{payerid:{type:Number}}
],

count: {
type:Number
},
formnumber: {
  type:Number},
board1_id: {
type: Number,},
formtype: {
type:String,},
formidx: {
type:  Schema.Types.ObjectId,}, //문서 번호
drafter: {
type: String,}, //기안자
draftDate: {
type: Date,
default: Date.now,}, //기안일
belong: {
type: String,}, //소속   
titleform: {
type: String},
startDate:{
  type:Date}, //제목
data: {
type: String,  },//내용
cop: {
type: String},//협조부서
cDate: {
type: Date }, //시행일자
status: {
type:String,
default:'완료'},
emergency: {
type:String},
checked: {
  type:String},
resttype: {
  type: String,}, //휴가타입 
userest: {
  type: String,},
startDate: {
  type: Date, },
endDate: {
  type: Date,},
address: {
  type: String }, //주소
phone: {
  type: String }, //전화번호
homenumber:{
  type:String},
publishedDate: {
  type:Date},
submits: {
  type:String},
 aim: {
  type:String},//목적  
 meetman: {
   type:String},
 meetdate: {
  type:Date},
 reason: {
   type:String},
 content: {
   type:String},
  Names:{
     type: String},
  department:{
      type:String},
rank:{
      type:String},
loginid:{
type:String},
imageName: {
  type: String,
  default: "none",
 // required: true
},
imageData: {
  type: String,
 // required: true
}
});

formSchema.plugin(autoIncrement.plugin,{ 
model : 'formSchema', 
field : 'board1_id', 
startAt : 1, //시작 
increment : 1 // 증가 });
});
formSchema.plugin(autoIncrement.plugin,{ 
  model : 'formSchema', 
  field : 'payerid', 
  startAt : 1, //시작 
  increment : 1 // 증가 });
  });
  


var Form = connection.model('Form', formSchema);
module.exports = Form;