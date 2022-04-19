const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
// const bcrypt = require('bcrypt');

const app = express();

/*　public配下のファイル読み込み */
// app.use(express.static('public'));

/*　Express.jsで配列型のフォームデータを受け取るための準備 */
app.use(express.urlencoded({extended: false}));

/* セッション管理の準備 */
app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

/* 共通処理：ログイン状態の確認 */
app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = 'ゲスト';
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

/* DB接続設定 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  /* 設定したパスワードに修正 */
  password: '*******',
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
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        if(req.body.password === results[0].password){
          req.session.userId = results[0].id;
          res.redirect('/index');  
        } else {
          res.redirect('/login');
        }     
      } else {
        res.redirect('/login');
      }
    }
  );
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/index');
  });
});

app.listen(3000);