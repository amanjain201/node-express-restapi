var faker = require("faker");
var dao = require("../models/dao.js");

var appRouter = function (app) {
    app.get("/", function(req, res){
        res.status(200).send("Welcome to Aman's restful API");
    });
    
    app.get("/users", function(req, res){
//        var data = {
//            firstName : faker.name.firstName(),
//            lastName : faker.name.lastName(),
//            userName : faker.internet.userName(),
//            email : faker.internet.email()
//        }
        dao.getAllUsers(function(err , results) {
            if(err) {
                res.status(400).send({message: err});
            }
            var users = {};
            users.users = results;
            res.status(200).send(users);
        });
        
    });
    
    
    app.get("/user/:num", function (req, res) {
        console.log("Getting Specific User..")
        var num = req.params.num;
        if(isFinite(num) && num > 0) {
            dao.getSpecificUser(num, function(err , result) {
                if(err) {
                    res.status(400).send({message : err});
                }
                console.log("Printing result.....");
                console.log(result);
                if(result[0] !== undefined ) {
                    var user = result[0];
                    res.status(200).send(user);
                } else {
                    res.status(404).send({message : 'User not found'});
                }
            })
        } else {
            res.status(400).send({message : 'invalid user id supplied'});
        }
    });
    
    app.post("/user" , function(req, res) {
        console.log(req.body);
        var reqObj = req.body;
        var value = [reqObj.firstname, reqObj.lastname, reqObj.username, reqObj.email];
        dao.create(value, function(err, result){
            if(err) {
                console.log("Failed to create User");
                res.status(400).send({message : 'Failed to create User'});
            } else {
                console.log("User created successfully with ID: " + result);
                res.status(200).send({id : result, message : 'User created successfully with ID: ' + result});
            }
        })
        
    });
    
    app.delete("/user/:num", function(req, res){
        var num = req.params.num;
        if(isFinite(num) && num > 0) {
            dao.deleteUser(num, function(err, result) {
                if(err) {
                    res.status(400).send({message : err});
                }
                console.log(result);
                if(result > 0) {
                    res.status(200).send({message: 'User deleted successfully.'});
                } else {
                    res.status(404).send({message: 'User not found.'})
                }
            })
        } else {
            res.status(400).send({message : 'invalid user id supplied'});
        }
    })
}


module.exports = appRouter;