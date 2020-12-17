const express = require("express");
const app = express();
var router = express.Router();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");
var Form = require('../schemas/Form');
const data = fs.readFileSync('./database.json');
const corsOptions = {
  origin: true,
  credentials: true
};

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

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/member", require("./routes/memberRouter"));
//app.use("/board", require("./routes/boardRouter"));




//form  작성
router.post('/form', function(req, res){
  Form.create(req.body, function(err,post ){
    if(err) return res.json(err);
    res.redirect('/form/addform1');
  });
});


const multer = require('multer');
const upload = multer({dest: './upload/'});

router.get('/:id', function(req, res){
  Post.findOne({formidx:req.params.id}, function(err, post){
    if(err) {
        
      return res.json(err)+"에러발생";
    } 
    
    res.render('posts/show', {post:post});
  });
});


app.post('/', function(req, res){
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});









app.use('/image', express.static('./upload'));
db.users.insert({a:3, b:5}) 
app.post('/api/customers', upload.single('image'), (req, res) => {

  db.users.insert({a:3, b:5}) 
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = 'http://localhost:3001/image/' + req.file.filename;
  let 
  let params = [titleform];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
})




















app.listen(3001, () => {
  console.log("node server 시작");
});
