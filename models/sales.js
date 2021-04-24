const Sequelize = require("./index").db.Sequelize;
const connection = require("./index").db.connection;


sales = connection.define(
	"sales",
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false },
		amount: { type: Sequelize.FLOAT, allowNull: false }
	},
	{
		tableName: "sales",
	}
);

module.exports = sales;
