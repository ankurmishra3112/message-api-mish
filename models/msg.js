/**
 * Created by ankurmishra on 4/5/17.
 */
module.exports = function (sequelize, DataType) {
    return sequelize.define("message",{
        text: {
            type: DataType.STRING,
            allowNull: false
        },
        source: {
            type: DataType.STRING
        },
        time: {
            type: DataType.DATE
        }
    })
}