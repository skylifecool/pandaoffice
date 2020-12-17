const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const Form = require('../models/Form');
const User = require('../models/User');
const File = require('../models/File');
//const Image= require('../models/image');
const Reply = require('../models/Reply');
const crypto = require("crypto");
const session = require("express-session");
const { count } = require('console');

router.get('/', (req, res) => {
    Form.find().sort( { "_id": -1 } ).limit(6)
        .then((data) => {
            //console.log('데이터: ', data);         
            return res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/find', (req, res) => {
    Form.find({status: '완료' }).sort( { "_id": -1 } ).limit(6)
  
        .then((data) => {
            //console.log('데이터: ', data);         
            return res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
      });

///유저정보 상세 보기
router.post("/detail/user", async (req, res) => {           
        const loginid= req.body;
        const changeloginid=loginid['loginid'];
        console.log(changeloginid)      
        try {            
          const data = await User.find({loginid:changeloginid});
          res.json({data});
          console.log("유저정보",data);
        } catch (err) {
          console.log(err);
          res.json({ message: false });
        }
    });

router.post('/save/reply', (req, res) => {
  console.log('접속댓글save');
  const data = req.body;
  console.log("데이터",data);
  const newReply = new Reply(data);
  newReply.save((error) => {
      if (error) {
          res.status(500).json({ msg: 'Sorry, internal server errors' });
          return;
      }       
      return res.json({
          msg: '데이터 저장되었습니다.'
      });
  });
});


router.post("/detailreply", async (req, res) => {
  //Form.findOne({board1_id : req.params.board1_id}, function(err, post) {
  const  board1_id=req.body.board1_id;
  console.log("게시글번호:"+board1_id);     
  try {            
    const data = await Reply.find({ board1_id:board1_id });
    res.json({ data });
    console.log("댓글목록",data);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/countreply", async (req, res) => {
  //Form.findOne({board1_id : req.params.board1_id}, function(err, post) {
  const  board1_id=req.body.board1_id;
  console.log("게시글번호:"+board1_id);     
  try {            
    const data = await Reply.find({ board1_id:board1_id }).count();
    res.json({ data });
    console.log("댓글개수",data);
   
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

//replyid가 ?인 댓글을 지움 해당 아이디만
router.post("/delete/reply", async (req, res) => {
  try {
    await Reply.remove({
      reply_id: req.body.reply_id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post('/findpart', async (req, res) => {
  const department= req.body;
  console.log("/findpart부서:",department);
  const changedep1=department['dep1'];
  try {            
    const data = await User.find({ department:changedep1});
    //res.json({ data }); 
    console.log(data);
    return res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post('/findpart1', (req, res) => {
  User.find({department: '마케팅부' })
      .then((data) => {
          //console.log('데이터: ', data);         
          return res.json(data);
      })
      .catch((error) => {
          console.log('error: ', error);
      });
});
router.post('/findpart2', (req, res) => {
  User.find({department: '경영본부' })
      .then((data) => {
          //console.log('데이터: ', data);         
          return res.json(data);
      })
      .catch((error) => {
          console.log('error: ', error);
      });
});
router.post('/findpart3', (req, res) => {
  User.find({department: '개발부' })
      .then((data) => {
          //console.log('데이터: ', data);         
          return res.json(data);
      })
      .catch((error) => {
          console.log('error: ', error);
      });
});
router.post('/findpart4', (req, res) => {
  User.find({department: '서비스부' })
      .then((data) => {
          //console.log('데이터: ', data);         
          return res.json(data);
      })
      .catch((error) => {
          console.log('error: ', error);
      });
});
router.post('/findpart5', (req, res) => {
  User.find({department: '시스템부' })
      .then((data) => {
          //console.log('데이터: ', data);         
          return res.json(data);
      })
      .catch((error) => {
          console.log('error: ', error);
      });
});
//결재문서 저장
router.post('/save', (req, res) => {
    console.log('접속/save');
     
    const data = req.body;
    //const payerdata=payer[data];
    console.log("데이터",data);
    
    const newForm = new Form(data);
    newForm.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }       
        return res.json({
            msg: '데이터 저장되었습니다.'
        });
    });
});

router.post("/payinfo", async (req, res) => {

  const data=req.body;  
  console.log(data);
  console.log(data[0]);
  console.log(data[1]);
  
  const newForm = new Form({payinfo:data});
  newForm.save((error) => {
      if (error) {
          res.status(500).json({ msg: 'Sorry, internal server errors' });
          console.log(error);
          return;
      }       
      return res.json({
          msg: '데이터 저장되었습니다.'
      });
  });
  }); 






///////상신취소후 다시 결재작성

router.post("/update", async (req, res) => {
console.log("게시글번호:"+board1_id); 
  const  board1_id=req.body.board1_id;
  try {
    await Form.update(
      {board1_id: req.body.board1_id },
      {
        $set: {
          titleform: req.body.titleform,               
        }
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update2", async (req, res) => {
   
    const  board1_id=req.body.board1_id;
    const aaa=req.body;
    console.log(aaa);
    const count=req.body.count;
    
    console.log("게시글번호,댓글수??:"+board1_id,count);
    try {
      await Form.update(
        {board1_id: req.body.board1_id },
        {
          $set: {
            count: count,               
          }
        }
      );
      res.json({ message: "게시글이 수정 되었습니다." });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });



router.post("/updateform", async (req, res) => {
   
  const  board1_id=req.body.board1_id;
  console.log("게시글번호:"+board1_id);
  console.log("제목:",req.body.titleform); 
  //업데이트하고자 하는 컬럼? 기안자가 재작성한 페이지
  try {
    await Form.update(
      { board1_id: req.body.board1_id },
      {
        $set: {
          titleform: req.body.titleform,
          cop: req.body.cop,
          data:req.body.data,
          resttype:req.body.resttype,
          submits:req.body.submits,
          reason:req.body.reason,
          address:req.body.address,
          contnet:req.body.content,
          phone:req.body.phone,
          homenumber:req.body.homenumber,
          meetman:req.body.meetman,
          aim:req.body.aim        
          //날짜 누락되있음
          //startDate:req.body.startDate,
          /*
          data:req.body.data,
          //endDate:req.body.endDate,
          resttype:req.body.resttype,
          submits:req.body.submits,
          reason:req.body.reason,
          address:req.body.address,
          contnet:req.body.content,
          phone:req.body.phone,
          homenumber:req.body.homenumber,
          meetman:req.body.meetman,
          meetdate:req.body.meetdate,
          aim:req.body.aim
          */
        }
      }
    );
    res.json({ message: "결재양식이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

///게시글 상세보기(detail)
router.post("/detail/", async (req, res) => {
    //Form.findOne({board1_id : req.params.board1_id}, function(err, post) {
    const  board1_id=req.body.board1_id;
    console.log("게시글번호:"+board1_id);     
    try {            
      const data = await Form.find({ board1_id:board1_id });
      res.json({ data });
      console.log(data);
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

//사용자 정보 불러오기 페이지
  router.get("/userfind", async (req, res) => {   
    try {
      const data = await User.find({ loginid: req.session.loginid });
      res.json({ data});
      console.log(data);
    } catch (err) {
      console.log(err);
      res.json({ message: false });

    }
  });
  
 /*
  router.post("/detail", (body, callback) => {
    Form.find({ board1_id:body.board1_id })
  .then(result => {
      callback(result);
      res.json("결과:",result);
  })
  .catch(err => {
      throw err;
  })
})
  */
  
/////회원가입
router.post("/join", async (req, res) => {
    try {
      let obj = { loginid: req.body.loginid };

      let user = await User.findOne(obj);
      console.log(user);
      if (user) {
        res.json({
          message: "아이디가 중복되었습니다. 다른 아이디를 입력해주세요.",
          dupYn: "1"
        });
  
      } else {
        crypto.randomBytes(64, (err, buf) => {
          if (err) {
            console.log(err);
          } else {
            crypto.pbkdf2(
              req.body.password,
              buf.toString("base64"),
              100000,
              64,
              "sha512",
              async (err, key) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(key.toString("base64"));
                  buf.toString("base64");
                  obj = {
                    loginid: req.body.loginid,
                    Names: req.body.Names,
                    rank:req.body.rank,
                    role:req.body.role,
                    department:req.body.department,
                    register:req.body.register,
                    password: key.toString("base64"),
                    salt: buf.toString("base64")
                  };
                  user = new User(obj);
                  await user.save();
                  res.json({ message: "회원가입 되었습니다! 로그인페이지로 이동합니다.", dupYn: "0" });
                }
              }
            );
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

//로그인
router.post("/login", async (req, res) => {
    try {
      //? 아이디가 존재하는지 확인
      await User.findOne({ loginid: req.body.loginid }, async (err, user) => {
        if (err) {
          console.log(err);
        } else {
          console.log(user);
          if (user) {
            //아이디가 존재할 경우 이메일과 패스워드가 일치하는 회원이 있는지 확인
            console.log(req.body.password);
            console.log("salt",user.salt);
            crypto.pbkdf2(
              req.body.password,
              user.salt,
              100000,
              64,
              "sha512",
              async (err, key) => {
                if (err) {
                  console.log(err);
                } else {
                  // console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
  
                  const obj = {
                    loginid: req.body.loginid,
                    password: key.toString("base64")
                  };
  
                  const user2 = await User.findOne(obj);
                  console.log("유저2",user2);
                  if (user2) {
                    // 있으면 로그인 처리
                     console.log("바디1",req.body._id);
                     console.log("바디:",req.body.loginid);
                     

                    await User.updateOne(
                      {
                        loginid: req.body.loginid
                      },
                      { $set: { loginCnt: 0 } }
                    );
                     
                    req.session.loginid = user.loginid;
                    console.log("세션로그인아이디",req.session.loginid);
                    //?d아래
                    console.log(user.loginid);
                    res.json({
                      message: "로그인 되었습니다!",
                      _id: user2._id,
                      loginid: user2.loginid
                    });
                  } else {
                    //없으면 로그인 실패횟수 추가
                    if (user.loginCnt > 4) {
                      res.json({
                        message:
                          "아이디나 패스워드가 5회 이상 일치하지 않아 잠겼습니다."
                      });
                    } else {
                      await User.updateOne(
                        {
                          loginid: req.body.loginid
                        },
                        { $set: { loginCnt: user.loginCnt + 1 } }
                      );
                      if (user.loginCnt >= 5) {
                        await User.updateOne(
                          {
                            loginid: req.body.loginid
                          },
                          { $set: { lockYn: true } }
                        );
                        res.json({
                          message:
                            "아이디나 패스워드가 5회 이상 일치하지 않아 잠겼습니다.\n고객센터에 문의 바랍니다."
                        });
                      } else {
                        res.json({
                          message: "아이디나 패스워드가 일치하지 않습니다."
                        });
                      }
                    }
                  }
                }
              }
            );
          } else {
            res.json({ message: "아이디나 패스워드가 일치하지 않습니다." });
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.json({ message: "로그인 실패" });
    }
  });


  router.get("/logout", (req, res) => {
    console.log("/logout" + req.session.loginid);
    req.session.destroy(() => {
      res.json({ message: true });
    });
  });

  router.get("/logincheck",(req,res) => {
    console.log("세션이 들어있는지:",req.session.loginid);
    sessioncheck= req.session.loginid;
    res.json({message:"세션체크",sessioncheck});   
  });
 
//////////////////////////////////////이너조인?????
/* 
  console.log(Form.aggregate([{
       $lookup: {
           from: User,
          localField: board1_id,
         foreignField: board1_id,
          as: resultjoin
      }
    }]));
 */







/*

  router.get("/userfind", async (req, res) => {
    try {

      const user = await User.find({ loginid: req.session.loginid });
      res.json({ message: user});

    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  */
 /*
  router.get("/userfind", async (req, res) => {
    try {
      //const rank=User.find({loginid: req.session.loginid }, {"rank":1});
      //res.json({rank: message});
     // const Names=User.find({loginid: req.session.loginid }, {"Names":1});
     // res.json({dNames: Names});

      //const Names = await User.find({ loginid: req.session.loginid },{"Names":1});     
    } catch (err) {
      console.log(err);
    }
  });
*/
///////게시판 페이징
router.get("/getUsers/:id?", function (req, res) {
  if (req.params.id) {
     //index 개수
      Form.find({})
      .count()
      .then(data => {
          res.status(200).send({
              "cnt" : data
          })
      })
      .catch(err => {
         res.status(400).send({
             "err" : err
         })
      })
  }
})

/////게시판페이징2
router.post("/getUsers",function(req,res){
  const pagination = req.body.pagination ? parseInt(req.body.pagination) : 10;
  //시작할페이지 /pageNumber
  const pageNumber = req.body.page ? parseInt(req.body.page) : 1;
  Form.find({})
       //1페이지씩 이동
      .sort({"_id" : -1})
      .skip((pageNumber - 1) * pagination)
       //제한없음(데이터수만큼 다보여주기 (페이징하면서))
      .limit(pagination)
      .then(data => {
          res.status(200).send({
              "users": data
          })
      })
      .catch(err => {
          res.status(400).send({
              "err": err
          })
      })
})

//이미지 파일 첨부
app.post('/upload', async (req, res) => {
  try {
    const newImage = new User({imageUrl: req.body.imageUrl});
    await newImage.save();
    res.json(newImage.imageUrl);
  } catch (err) {
    console.error('에러발생', err);
  }
});

app.get('/getLatest', async (req, res) => {
  const getImage = await File.findOne().sort({ _id: -1 });
  res.json(getImage.imageUrl);
});


/*
const path = require("path");
const multer = require("multer");
const File = mongoose.model("file");
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myfile");
const obj =(req,res) => {
  console.log("nigga")
  upload(req, res, () => {
     console.log("Request ---", req.body);
     console.log("Request file ---", req.file);//Here you get file.
     const file = new File();
     file.meta_data = req.file;
     file.save().then(()=>{
     res.send({message:"uploaded successfully"})
     })
  });
}
router.post("/upload", obj);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
});

const fileFilter=(req, file, cb)=>{
 if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
     cb(null,true);
 }else{
     cb(null, false);
 }

}
var upload = multer({ 
  storage:storage,
  limits:{
      fileSize: 1024 * 1024 * 5
  },
  fileFilter:fileFilter
});

router.post("/update-profile/",upload.single('profileImage'),function(req,res,next){

   var profilePic= req.file.path;
   userModel.findById(id,function(err,data){
    data.profileImage=profilePic?profilePic:data.profileImage;
      Profile.save()
        .then(doc=>{
           res.status(201).json({
               message:"Profile Image Updated Successfully",
               results:doc
           });
        })
        .catch(err=>{
            res.json(err);
        })
       
   });

});
*/


module.exports = router;