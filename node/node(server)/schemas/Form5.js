var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
autoIncrement.initialize(connection);

var formSchema5 = new Schema({
board5_id: {
type: Number,
},
  //휴직원
  status: { 
    type:String,
    default:'완료'
  },
  formtype: {
    type:String,
    default:'휴직원'
   },
   titleform: {
    type: String,
    default:'휴직원'
  },
  formidx: {
    type: Schema.Types.ObjectId,
  }, //문서 번호
  drafter: {
    type: String,
  }, //기안자
  draftDate: {
    type: Schema.Types.ObjectId,
    Date:Date.now
  }, //기안일
  belong: {
    type: String,
  }, //소속    
  //시작일
  startDate: {
    type: Date,
  },
  endDate: {
      type: Date,
  },
  reason: {
    type:String
  },
  address: {
    type: String 
  }, //주소
  phone: {
    type: String 
  }, //전화번호
  emergency: {
    type:String
  },
  homenumber:{
    type:String
  } 
});
formSchema5.plugin(autoIncrement.plugin,{ 
  model : 'formSchema5', 
  field : 'board5_id', 
  startAt : 1, //시작 
  increment : 1 // 증가 });
  });

module.exports = mongoose.model("Form5", formSchema5);
