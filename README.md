# todo_node
Todoアプリ(node.js)

■実行コマンド

　nodemon app.js
　http://localhost:3000/ で表示

■インストール

・nodeプロジェクト作成
　npm init --yes

・expressインストール
　npm install express ejs

・nodemonインストール
　npm install -g nodemon
　
⇒　nodemon app.js

・mysqlパッケージのインストール
　npm install mysql

・express-sessionインストール

　

■DB：mysql

　・MySQLを起動⇒MySQLにログインという順番
　net start mysql57
　mysql --user=root --password
　
　・MySQLログアウトを起動
　exit;
　
　・MySQLを終了
　net stop mysql57
　
　★データベースの作成
　
　SHOW databases;
　CREATE DATABASE [データベース名];
　USE [データベース名];
　SHOW tables;
　CREATE TABLE [テーブル名] (id INT AUTO_INCREMENT, name TEXT, PRIMARY KEY (id)) DEFAULT CHARSET=utf8;
　DESCRIBE [テーブル名];
　DROP TABLE [テーブル名];
　DROP DATABASE [データベース名];
 
 ■DBテーブル定義

・articles
 ・id
 ・title
 ・summary
 ・content
 ・category
 
・users
 ・id
 ・username
 ・email
 ・password
 
 
