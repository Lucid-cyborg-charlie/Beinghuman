// creation of data base and tables orphan, orphanReported, and user

var Sqlite = require('better-sqlite3');
var db = new Sqlite('db.sqlite');
const fs = require('fs');

var entries = JSON.parse(fs.readFileSync('data.json').toString());

console.log("avant load() ");

var load = function(filename) {
  const news = JSON.parse(fs.readFileSync(filename));


db.prepare('DROP TABLE IF EXISTS orphan').run();      // orphans reorted by users only addmin can add them after fix their case
db.prepare('DROP TABLE IF EXISTS news').run();         // actualities about orphan
db.prepare('DROP TABLE IF EXISTS reported').run();     // orphan reported by users...
db.prepare('DROP TABLE IF EXISTS user').run();        // users
db.prepare('DROP TABLE IF EXISTS commentaries').run();    // commentaries about testimonies
db.prepare('DROP TABLE IF EXISTS testimony').run();   // testimonies


db.prepare('CREATE TABLE testimony (id INTEGER, name TEXT, description TEXT)').run(); 


db.prepare('CREATE TABLE commentaries (id INTEGER, name TEXT, description TEXT)').run();

db.prepare('CREATE TABLE news (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, picture TEXT, description TEXT)').run();
db.prepare('CREATE TABLE orphan (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, country TEXT, city TEXT, birthday TEXT, date TEXT)').run();
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, mail TEXT, password TEXT, country TEXT)').run();
db.prepare('CREATE TABLE reported(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER CONSTRAINT user_id REFERENCES user, description TEXT, country TEXT, city TEXT, date TEXT, name TEXT, firstName, tel NUMBER, adress TEXT)').run();

 var insert1 = db.prepare('INSERT INTO news VALUES (@id, @title, @date, @picture, @description)');

 var transaction = db.transaction((news) => {

    for(var id = 0;id < news.length; id++) {
      var data = news[id];
      data.id = id;
      insert1.run(data);
    }
  }); 

  transaction(news);

}

load('data.json');

