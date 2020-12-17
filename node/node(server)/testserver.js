const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
const port = process.env.PORT || 5000; //포트 번호
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");
connect();
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
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
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload/'});

app.get('/select', (req, res) => {
  connection.query('SELECT * FROM CUSTOMER',
    (err, rows, fields) => {
      console.log(rows);
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));