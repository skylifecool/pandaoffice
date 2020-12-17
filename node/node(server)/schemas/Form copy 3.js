const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const formSchema = new Schema({
  formidx: {
    type: ObjectId,
  }, //문서 번호
  status: { 
    type:String,
    default:'완료'
  },
  drafter: {
    type: String,
  }, //기안자
  draftDate: {
    type: Date,
    default: Date.now,
  }, //기안일
  belong: {
    type: String,
  }, //소속   
  titleform: {
    type: String,   
  }, //제목
  editor: {
    type: String, 
  },//내용
  cop: {
    type: String
  },//협조부서
  cDate: {
    type: Date 
  } //시행일자
});

var Form = mongoose.model('Form', formSchema);
module.exports = Form;