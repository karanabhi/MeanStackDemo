const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/meows', function (req, res, next) {
    var meows = [
        "Hi", "Hello", "Ola!"
    ];
    res.send(meows);
});

app.listen(3002, function () {
    console.log('Routing app listening on port 3002!')
})