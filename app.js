var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var db = require('./dbconfig/db.js');
var app = express();
var server;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

db.connect(db.MODE_PRODUCTION, function(err){
    if(err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1);
    } else {
       server = app.listen(3000 , function () {
            console.log("App running on port : " + server.address().port);
       }); 
    }
})
routes(app);
