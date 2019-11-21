var db = require("../dbconfig/db.js");


exports.create = function(values, done) {
    db.get(db.WRITE, function(err, connection){
        if(err) {
            return done('Database connection problem...');
        }
        connection.query('INSERT INTO USER (firstname, lastname, username, email) VALUES(?, ?, ?, ?)', values, function(err, result) {
          connection.release();    
          if (err){ 
              return done(err);
          }
          done(null, result.insertId);
        });
    })
};

exports.getAllUsers = function(done) {
    db.get(db.READ, function(err, connection){
        if(err) {
            return done('Database connection issues...');
        }
        connection.query('SELECT * FROM USERINFO.USER', function(err, rows){
            connection.release();
            if(err) {
                return done(err);
            }
            done(null, rows);
        });
    });
}

exports.getSpecificUser = function(userId , done) {
    db.get(db.READ, function(err, connection){
        if(err) {
            return done("DB connection issues...");
        }
        connection.query('SELECT * FROM USERINFO.USER WHERE ID = ?', userId , function(err, rows){
            connection.release();
            if(err) {
                return done(err);
            }
            done(null, rows);
        })
    })
};

exports.deleteUser = function(userId, done) {
    db.get(db.WRITE, function(err, connection) {
        if(err) {
            return done("Failed to connect to DB...");
        }
        connection.query("DELETE FROM USERINFO.USER WHERE ID = ?",  userId, function(err, result){
            connection.release();
            if(err) {
                return done(err);
            }
            done(null, result.affectedRows);
        });
    });
}
