# todo_node
Todoアプリ(node.js+Express)

■実行コマンド

　nodemon app.js <br>
　http://localhost:3000/ で表示

■インストール

　・nodeプロジェクト作成<br>
　　npm init --yes

　・expressインストール<br>
　　npm install express ejs

　・nodemonインストール<br>
　　npm install -g nodemon<br>

　・mysqlパッケージのインストール<br>
　　npm install mysql

　・express-sessionインストール<br>

　

■DB：mysql

　・MySQLを起動⇒MySQLにログインという順番<br>
　　net start mysql57<br>
　　mysql --user=root --password<br>
　<br>
　・MySQLログアウト<br>
　　exit;<br>
　<br>
　・MySQLを終了<br>
　　net stop mysql57<br>
　<br>
　★データベースの作成<br>
　<br>
　　SHOW databases;<br>
　　CREATE DATABASE [データベース名];<br>
　　USE [データベース名];<br>
　　SHOW tables;<br>
　　CREATE TABLE [テーブル名] (id INT AUTO_INCREMENT, name TEXT, PRIMARY KEY (id)) DEFAULT CHARSET=utf8;<br>
　　DESCRIBE [テーブル名];<br>
　　DROP TABLE [テーブル名];<br>
　　DROP DATABASE [データベース名];<br>
 
■DBテーブル定義

　①articles<br>
 　・id<br>
 　・title<br>
 　・summary<br>
 　・content<br>
 　・category<br>
 
　②users<br>
 　・id<br>
 　・username<br>
 　・email<br>
 　・password<br>
 
 
