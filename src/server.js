/**
 * Created by ankurmishra on 4/4/17.
 */
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    console.log("Starting server at port "+PORT);
});