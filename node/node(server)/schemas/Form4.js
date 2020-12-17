/*11.16 수정*/

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
autoIncrement.initialize(connection);

var formSchema4 = new Schema({
board4_id: {
type: Number,
},
  status: { 
    type:String,
    default:'완료'
  },
  formtype: {
    type:String,
    default:'증명서신청(개인)'
   },
   titleform: {
    type: String,
    default:'증명서신청(개인)'
  },  

  formidx: {
    type:  Schema.Types.ObjectId,
  }, //문서 번호
  drafter: {
    type: String,
  }, //기안자
  draftDate: {
    type: Date,
    Date:Date.now
  }, //기안일
  belong: {
    type: String,
  }, //소속

  publishedDate: {
      type:Date
  }, //발행일자
  reason: {
    type:String
  }, //용도
  submits: {
   type:String
  },
  address: {
    type:String
   },//영문주소
   emergency: {
    type:String
  },
   content: {
    type:String
   } 
});
formSchema4.plugin(autoIncrement.plugin,{ 
  model : 'formSchema4', 
  field : 'board4_id', 
  startAt : 1, //시작 
  increment : 1 // 증가 });
  });

module.exports = mongoose.model("Form4", formSchema4);
