const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require("cors");
const session = require("express-session");
const schemas= require("./schemas");
const app = express();
//app.use("/member", require("./routes/memberRouter"));
const PORT = process.env.PORT || 3001; 
const routes = require('./routes/api');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test"
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('몽고DB연결됨');
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

const corsOptions = {
    origin: true,
    credentials: true, 
  };
/*
app.use(cors(corsOptions));
  app.use(function (req, res, next) {
    console.log('사용?');	
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
*/



/*
  const upload = require('./server/fileupload');
  const multer = require('multer'); 
  const router = express.Router();
  router.post("api/upload", (req, res, next) => {
    // FormData의 경우 req로 부터 데이터를 얻을수 없다.
    // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다  
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return next(err);
      } else if (err) {
        return next(err);
      }
      console.log('원본파일명 : ' + req.file.originalname)
      console.log('저장파일명 : ' + req.file.filename)
      console.log('크기 : ' + req.file.size)
      // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
      return res.json({success:1});
    });
  });
*/
var ImageRouter = require('./routes/image');
app.use('/image', ImageRouter);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//require("./models/Form");
var logger = require('morgan');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
  return next();
});

app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use(cors(corsOptions));
app.listen(PORT, console.log(`Server is starting at ${PORT}`));