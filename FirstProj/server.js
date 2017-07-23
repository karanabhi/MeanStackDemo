const express = require('express')
const app = express();
var bodyParser = require('body-parser');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static('public'));

app.use(bodyParser.json());

var meows = ["Hi", "Hello", "Ola!"];
app.get('/meows', function (req, res, next) {
    res.send(meows);
});

app.post('/meows', function (req, res, next) {
    meows.push(req.body.postData);
    console.log(meows);
    res.send();
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


