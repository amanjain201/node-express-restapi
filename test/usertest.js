var supertest = require("supertest");
var should = require('should');

var server = supertest.agent("http://localhost:3000");
var userId;

describe("Unit Tests to User CRUD Ops...", function(){
    it("Welcome Path", function(done) {
        server
        .get("/")
        .expect(200)
        .end(function(err, res){
//            console.log(res);
           res.status.should.equal(200);
            res.text.should.equal("Welcome to Aman's restful API");
            done();
        });
    });
    
    it("Create an user", function(done) {
        server
        .post("/user")
        .send({
            firstname : 'test',
            lastname : 'user',
            username: 'testuser',
            email: 'testuser@gmail.com'
        })
        .expect(200)
        .end(function(err, res) {
            userId = res.body.id;
            res.status.should.equal(200);
            res.body.message.should.equal("User created successfully with ID: " + userId);
            done();
        })
    });
    
    it("Get all users", function(done) {
        server
        .get("/users")
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
//            console.log(res.body.users.length);
            res.body.users.length.should.be.above(0);
            done();
        })
    });
    
    it("Get specific user", function(done) {
        server
        .get("/user/"+userId)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            res.body.firstname.should.equal('test');
            done();
        })
    });
    
    it("Delete User", function(done){
        server
        .delete("/user/"+userId)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            res.body.message.should.equal('User deleted successfully.');
            done();
        });
    });
});