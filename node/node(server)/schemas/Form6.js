
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
autoIncrement.initialize(connection);

var formSchema6 = new Schema({
  //휴직원
  status: { 
    type:String,
    default:'완료'
  },
  board6_id: {
    type: Number,
    },
  titleform: {
    type:String,
    default:'회의록'
  },
  formtype: {
    type:String,
    default:'회의록'
   },
  formidx: {
    type: Schema.Types.ObjectId,
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
  aim: {
   type:String
  },//목적  
  content: {
    type: String,
  },//내용
  meetman: {
    type:String
  }, 
  meetDate: {
    type: Date 
  }, //시행일자
  emergency: {
    type:String
  }
});

formSchema6.plugin(autoIncrement.plugin,{ 
  model : 'formSchema6', 
  field : 'board6_id', 
  startAt : 1, //시작 
  increment : 1 // 증가 });
  });

module.exports = mongoose.model("Form6", formSchema6);
