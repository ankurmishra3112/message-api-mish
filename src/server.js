/**
 * Created by ankurmishra on 4/4/17.
 */
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var _ = require("underscore");
app.use(bodyParser.json());

var db = require("./db.js");

//POST /message
app.post("/message", function (req,res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var body = _.pick(req.body,"text");
    body.source = ip;
    body.time = new Date().toString();
    db.message.create(body).then(function (message) {
        res.json(message.toJSON());
    },function (e) {
        res.status(400).send(e);
    })
});

//GET /message
app.get("/message", function (req,res) {
    db.message.findAll().then(function (messages) {
        res.json(messages);
    },function (e) {
        res.status(500).send();
    });
});

//DELETE /message
app.delete("/message/:id", function (req,res) {
    var msgId = parseInt(req.params.id);
    var where = {};
    where.id = msgId;
    db.message.destroy({
        where: where
    }).then(function(status) {
        console.log(status);
        if (status===0){
            res.status(404).send();
        }else{
            res.status(204).send();
        }
    },function (e) {
        res.status(500).send();
    })
});

//PUT /message

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("listening on port "+PORT);
    });
});