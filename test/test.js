var model = require('../model/model');
var Sqlite = require('better-sqlite3');
var db = new Sqlite('db.sqlite');

model.add_Testimony("joe", "lqbdjcqdbcljbdjqd");

var select = db.prepare('SELECT * FROM testimony').all();

console.log(select);
