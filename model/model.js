// globale variable
var Sqlite = require('better-sqlite3');
var db = new Sqlite('db.sqlite');


//*********************************************  model   *************************************************** */




// add a commentary
exports.add_commentary = (id, name, description) =>{
    var insert = db.prepare('INSERT INTO commentaries VALUES(?,?,?)');    
    insert.run([id, name, description]);
}




// display commentary about a user testimony
exports.displayCommentaries = (id)=> {
    var select = db.prepare('SELECT name, description FROM commentaries WHERE id = ?').all(id);
    return {select};
}




// return atualities
exports.displayNews = ()=>{
    var select = db.prepare('SELECT id, title, picture FROM news').all();
    var results = [];
    for(var i = 0; i < select.length; i++){
        results.push(select[i]);
    }
    return {results};
}




// select news
exports.selectNews = (id) =>{
    return db.prepare('SELECT * FROM news WHERE id = ?').all(id);
}




// add an user in table user
exports.add_user = (mail, password, country) =>{
    var id = 0;
    var insert = db.prepare('INSERT INTO user VALUES(?,?,?,?)');
    var select = db.prepare('SELECT id FROM user ORDER BY id').all();
    if(select.length == 0){
        insert.run([id, mail, password, country]);
        return id;
    }
    id = select[select.length - 1].id + 1;
    insert.run([id, mail, password, country]);
    return id;
}




// delete an user from table user
exports.delete_user = (id) =>{
    var deleteUser = db.prepare('DELETE FROM user WHERE id = ?');
    if(deleteUser !== undefined){deleteUser.run(id); return true}
    return false
    
}




// add an orphan in orphan
    exports.add_orphan = (name, country, city, birthday, date, picture) =>{
    var id = 0;
    var insert = db.prepare('INSERT INTO orphan VALUES (?,?,?,?,?,?,?)');
    var select = db.prepare('SELECT id FROM user ORDER BY id').all();
    if(select == null){
        insert.run([id, name, country, city, birthday, date, picture]);
        return;
    }
    id = select[select.length - 1].id + 1;
    insert.run([id, name, country, city, birthday, date, picture]);
}




// delete an orphan in table orphan
exports.delete_orphan = (id) =>{
    db.prepare('DELETE FROM orphan WHERE id = ?').run(id);
}





// add orphan reported by an user from table orphanReported
exports.report = (id_user, description, country, city, date, name, firstName, tel, adress) =>{
    var id = 0;
    var insert = db.prepare('INSERT INTO reported VALUES (?,?,?,?,?,?,?,?,?,?)');
    var select = db.prepare('SELECT id FROM reported ORDER BY id').all();
    if(select.length == 0){
        insert.run([id, id_user, description, country, city, date, name, firstName, tel, adress]);
        return;
    }
    id = select[select.length - 1].id + 1;
    insert.run([id, id_user, description, country, city, date, name, firstName, tel, adress]);    
}





// delete an orphan reported by an user from table orphanReported
exports.delete_orphanReported = (id) =>{
    var delete_orphan = db.prepare('DELETE FROM reported WHERE id = ?');
    delete_orphan.run(id);
}





// authenticate an user
exports.Check_login = (mail, password) =>{
    var select = db.prepare('SELECT id FROM user WHERE mail = ? AND password = ?');
    var id = select.get(mail, password);
    if(id !== undefined) return id.id;
    else return -1; 
}





// display testimony
exports.testimony = () =>{
    var results =  db.prepare('SELECT * FROM testimony').all();
    return {results};
}




// select testimony
exports.selectTestimony = (id) =>{
    var results =  db.prepare('SELECT * FROM testimony WHERE id = ?').all(id);
    return results;
}




// add testmony
exports.add_Testimony = (name, description) =>{
    var id = 0;
    var insert = db.prepare('INSERT INTO testimony VALUES(?,?,?)');
    var select = db.prepare('SELECT id FROM testimony ORDER BY id').all();
    if(select.length == 0){
        insert.run([id, name, description]);
        return;
    }
    id = select[select.length - 1].id + 1;
    insert.run([id, name, description]);
}