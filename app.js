const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  /* 設定したパスワード */
  password: '設定したパスワード',
  database: 'list_app',
});

connection.connect((err) => {
  if(err){
    console.log('error connection' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
      res.render('hello.ejs');
    }
  );
});

app.listen(3000);