// init project
require('dotenv').config();
var express = require('express');
var app = express();
let PORT = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));


// need to use the middleware before accessing the User Agent of a request
app.use(function(req, res, next) {
  res.locals.ua = req.get('User-Agent');
  next();
});

app.get('/api/whoami', function (req, res) {
  let resObj = {
    // information on why getting ip from this method is better
    // https://stackoverflow.com/a/10849772/13525159
    ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,

    language: req.headers['accept-language'],
    software: req.headers["user-agent"]
  }
  console.log(resObj)
  res.json(resObj);
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
