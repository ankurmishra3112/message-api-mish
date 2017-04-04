/**
 * Created by ankurmishra on 4/4/17.
 */
var express = require("express");
var app = express();
var __secretKey = "tomato";

var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var _ = require("underscore");

var middleware = {
    authForDel: function (req,res,next) {
        req.flag = false;
        if(req.body.key === __secretKey){
            req.flag = true;
        }
        next();
    }
};

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

//GET /message/:id
app.get("/message/:id",function (req,res) {
    var msgId = parseInt(req.params.id);
    db.message.findById(msgId).then(function (msg) {
        if (msg){
            res.json(msg);
        }else{
            res.status(404).send();
        }
    },function (e) {
        res.status(500).send();
    })
});

//DELETE /message
app.delete("/message/:id",middleware.authForDel, function (req,res) {
    if (req.flag){
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
        });
    }
    else{
        res.status(401).send();
    }
});

//PUT /message
app.put("/message/:id", function (req,res) {
    var msgId = parseInt(req.params.id);
    var body = _.pick(req.body, "text");
    var attributes = {};

    if (body.hasOwnProperty("text")){
        attributes.text = body.text;
    }

    db.message.findById(msgId).then(function (msg) {
        if (msg){
            msg.update(attributes).then(function (msg) {
                res.json(msg.toJSON());
            },function (e) {
                res.status(400).json(e);
            });
        }
        else{
            res.status(404).send();
        }
    },function (e) {
        res.status(500).send();

    })
});



db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("listening on port "+PORT);
    });
});