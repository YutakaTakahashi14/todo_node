const express = require('express');
const mysql = require('mysql');
// const session = require('express-session');
// const bcrypt = require('bcrypt');

const app = express();


// app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// app.use(
//   session({
//     secret: 'my_secret_key',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

/* 共通処理：ログイン状態の確認 */
// app.use((req, res, next) => {
//   if (req.session.userId === undefined) {
//     res.locals.usename = 'ゲスト';
//     res.locals.isLoggedIn = false;
//   } else {
//     res.locals.username = req.session.username;
//     res.locals.isLoggedIn = true;
//   }
// });

/* DB接続設定 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  /* 設定したパスワードに修正 */
  password: '',
  database: 'todo_app',
});

/* DB接続状態の確認 */
connection.connect((err) => {
  if(err){
    console.log('error connection' + err.stack);
    return;
  }
  console.log('success');
});

/* 以降ルーディング */

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  res.render('edit.ejs');
});

app.listen(3000);