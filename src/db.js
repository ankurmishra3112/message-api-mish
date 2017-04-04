/**
 * Created by ankurmishra on 4/5/17.
 */
var Sequelize = require("sequelize");
var sequelize = new Sequelize(undefined,undefined,undefined, {
    "dialect": "sqlite",
    "storage": "../data/msg-api-db.sqlite"
});

var db = {};
db.msg = sequelize.import("../models/msg.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;