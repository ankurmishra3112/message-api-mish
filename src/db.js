/**
 * Created by ankurmishra on 4/5/17.
 */
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var sequelize;

if (env==="production"){
    sequelize = new Sequelize(process.env.DATABASE_URL,{
        "dialect": "postgres"
    });
}else{
    sequelize = new Sequelize(undefined,undefined,undefined, {
        "dialect": "sqlite",
        "storage": "../data/msg-api-db.sqlite"
    });
}

var db = {};
db.message = sequelize.import("../models/msg.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;