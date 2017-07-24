const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcryptjs');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static('public'));
app.use(bodyParser.json());

var db = null;
//Connect DB
MongoClient.connect('mongodb://localhost:27017/mittins', function (err, dbConn) {
    if (!err) {
        console.log("MongoDB connected!");
        db = dbConn;
    }
});

//Get DB data
app.get('/meows', function (req, res, next) {
    db.collection('meows', function (err, meowsCollection) {
        meowsCollection.find().toArray(function (err, meows) {
            return res.json(meows);
        });
    });
});//get()

//Insert Data in DB
app.post('/meows', function (req, res, next) {
    //console.log(req.body.postData);    
    db.collection('meows').insertOne({
        text: req.body.postData
    }, function (err, result) {
        if (!err) {
            console.log("Successfull Insertion");
        } else {
            console.log("Failed Insertion");
        }
        return res.send();
    });
});

//Remove Db from DB
app.put('/meows/remove', function (req, res, next) {
    var removeItem = req.body.item._id;
    db.collection('meows').deleteOne({
        _id: ObjectId(removeItem)
    }, function (err, result) {
        if (!err) {
            console.log("Successfull Deletion");
        } else {
            console.log("Failed Deletion");
        }
        return res.send();
    });
});

//Insert SignUP user Data in DB
app.post('/users', function (req, res, next) {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.userData.upass, salt, function (err, hash) {

            if (hash) {
                var user = {
                    uname: req.body.userData.uname,
                    upass: hash
                };

                db.collection('users').insertOne(
                    user
                    , function (err, result) {
                        if (!err) {
                            console.log("Successfull SignUP");
                        } else {
                            console.log("Failed SignUp");
                        }
                        return res.send();
                    });
            } else {
                return res.status(400).send();
            }
        });
    });



});

//Sign In
app.put('/users/signin', function (req, res, next) {

    db.collection('users', function (err, usersCollection) {
        usersCollection.findOne({ uname: req.body.userSignIn.uname }, function (err, users) {
            if (users) {
                bcrypt.compare(req.body.userSignIn.upass, users.upass, function (err, result) {
                    if (result) {
                        return res.send();
                    } else {
                        return res.status(400).send();
                    }
                });
            } else {
                return res.status(400).send();
            }
        });
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
}); 