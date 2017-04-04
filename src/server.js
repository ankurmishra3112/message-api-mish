/**
 * Created by ankurmishra on 4/4/17.
 */
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var db = require("./db.js");

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("listening on port "+PORT);
    });
});