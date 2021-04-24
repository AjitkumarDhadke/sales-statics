const Sequelize = require("sequelize");

const db = {};

var connection = new Sequelize("sampleTable", "root", "AynRoot@1234", {
	dialect: "mysql",
});

db.connection = connection;
db.Sequelize = Sequelize;
module.exports = { db };
