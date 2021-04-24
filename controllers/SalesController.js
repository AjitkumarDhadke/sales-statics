const sales = require("../models/sales");
const Sequelize = require("../models/index").db.Sequelize;

module.exports = {
	async addSales(req, res) {
		if (
			!req.body.name ||
			!req.body.amount
		) {
			return res.status(400).json({
				message:
					"Add Sales failed! Required Fields are not available",
				responseData: {},
			});
		} else {
			let salesBodyData = {
				name: req.body.name,
				amount: req.body.amount
			};
			sales.create(salesBodyData)
				.then((salesResponse) => {
					if (salesResponse != null || salesResponse != undefined) {
						return res.status(200).json({
							message: "Sales added successfuly",
							responseData: {},
						});
					} else {
						return res.status(400).json({
							message: "Unable to add Sales",
							responseData: salesResponse,
						});
					}
				})
				.catch((e) => {
					const errObj = {};
					if (e.errors) {
						e.errors.map((er) => {
							errObj[er.path] = er.message;
							let strMsg = er.message.substring(er.message.indexOf(".") + 1);
							return res.status(400).json({
								message: strMsg,
								responseData: {},
							});
						});
					} else {
						return res.status(400).json({
							message: e.message,
							responseData: {},
						});
					}
				});
		}
	},

	async updateSales(req, res) {
		if (
			!req.body.id
		) {
			return res.status(400).json({
				message:
					"Update Sales failed! Required Fields are not available",
				responseData: {},
			});
		} else {
			let whereData = {
				where: { id: req.body.id },
				returning: true,
			};
			sales.update(req.body, whereData)
				.then((salesUpdateResponse) => {
					if (salesUpdateResponse[1] == 1) {
						return res.status(200).json({
							message: "Updated Sales Successfuly",
							responseData: {},
						});
					} else {
						return res.status(400).json({
							message: "Unable to update Sales",
							responseData: salesResponse,
						});
					}
				})
				.catch((e) => {
					const errObj = {};
					if (e.errors) {
						e.errors.map((er) => {
							errObj[er.path] = er.message;
							let strMsg = er.message.substring(er.message.indexOf(".") + 1);
							return res.status(400).json({
								message: strMsg,
								responseData: {},
							});
						});
					} else {
						return res.status(400).json({
							message: e.message,
							responseData: {},
						});
					}
				});
		}
	},

	async deleteSales(req, res) {
		if (!req.params["id"]) {
			return res.status(400).json({
				message:
					"Delete Sales failed! Required Fields are not available",
				responseData: {},
			});
		} else {
			sales.destroy({
				where: { id: req.params["id"] },
				returning: true,
			})
				.then((salesDeleteResponse) => {
					if (salesDeleteResponse == 1) {
						return res.status(200).json({
							message: "Sales successfuly Deleted",
							responseData: {},
						});
					} else {
						return res.status(400).json({
							message: "Unable to DeleteSales",
							responseData: salesDeleteResponse,
						});
					}
				})
				.catch((e) => {
					const errObj = {};
					if (e.errors) {
						e.errors.map((er) => {
							errObj[er.path] = er.message;
							let strMsg = er.message.substring(er.message.indexOf(".") + 1);
							return res.status(400).json({
								message: strMsg,
								responseData: {},
							});
						});
					} else {
						return res.status(400).json({
							message: e.message,
							responseData: {},
						});
					}
				});
		}
	},

	async getSalesList(req, res) {
		sales.findAll()
			.then((salesFindAllResponse) => {
				if (salesFindAllResponse) {
					return res.status(200).json({
						message: "get SalesList successfuly",
						responseData: salesFindAllResponse,
					});
				} else {
					return res.status(400).json({
						message: "unable to get Sales List",
						responseData: salesFindAllResponse,
					});
				}
			})
			.catch((e) => {
				const errObj = {};
				if (e.errors) {
					e.errors.map((er) => {
						errObj[er.path] = er.message;
						let strMsg = er.message.substring(er.message.indexOf(".") + 1);
						return res.status(400).json({
							message: strMsg,
							responseData: {},
						});
					});
				} else {
					return res.status(400).json({
						message: e.message,
						responseData: {},
					});
				}
			});
	},

	async getStatsSales(req, res) {
		if (!req.params["stats"]) {
			return res.status(400).json({
				message:
					"get stats Sales failed! Required Fields are not available",
				responseData: {},
			});
		} else {
			if (req.params["stats"] == "daily") {
				const Op = Sequelize.Op;
				const TODAY_START = new Date().setHours(0, 0, 0, 0);
				const NOW = new Date();
				sales.findAll({
					where: {
						createdAt: {
							[Op.gt]: TODAY_START,
							[Op.lt]: NOW
						}
					},
					order: [["createdAt", "ASC"]],
					returning: true,
				})
					.then((salesFindDailyResponse) => {
						if (salesFindDailyResponse.length > 0) {
							let hourObj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0 }
							let total = 0;
							salesFindDailyResponse.map((singleRecord) => {
								let hourIs = singleRecord.dataValues.createdAt.getHours();
								hourObj[hourIs] += singleRecord.dataValues.amount;
								total += singleRecord.dataValues.amount
							});
							console.log("hourObj    =>", hourObj);

							return res.status(200).json({
								message: "get Daily Sales successfuly",
								responseData: { HourlyData: hourObj, DayTotal: total },
							});
						} else {
							return res.status(400).json({
								message: "No record found to get Daily Sales",
								responseData: salesFindDailyResponse,
							});
						}
					})
					.catch((e) => {
						const errObj = {};
						if (e.errors) {
							e.errors.map((er) => {
								errObj[er.path] = er.message;
								let strMsg = er.message.substring(er.message.indexOf(".") + 1);
								return res.status(400).json({
									message: strMsg,
									responseData: {},
								});
							});
						} else {
							return res.status(400).json({
								message: e.message,
								responseData: {},
							});
						}
					});
			}
			else if (req.params["stats"] == "weekly") {
				const Op = Sequelize.Op;
				const NOW = new Date();
				const first = NOW.getDate() - NOW.getDay();
				const firstday = new Date(NOW.setDate(first)).toUTCString();
				sales.findAll({
					where: {
						createdAt: {
							[Op.gt]: firstday,
							[Op.lt]: new Date()
						}
					},
					order: [["createdAt", "ASC"]],
					returning: true,
				})
					.then((salesFindWeeklyResponse) => {
						if (salesFindWeeklyResponse.length > 0) {
							let weekObj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
							let total = 0;
							salesFindWeeklyResponse.map((singleRecord) => {
								let dayIs = singleRecord.dataValues.createdAt.getDay() + 1;
								console.log("singleRecordd    =>", singleRecord.dataValues.createdAt.getDay() + 1);
								weekObj[dayIs] += singleRecord.dataValues.amount;
								total += singleRecord.dataValues.amount
							});
							return res.status(200).json({
								message: "get Weekly Sales successfuly",
								responseData: { DailyData: weekObj, WeeklyTotal: total },
							});
						} else {
							return res.status(400).json({
								message: "No record found to get Weekly Sales",
								responseData: salesFindWeeklyResponse,
							});
						}
					})
					.catch((e) => {
						const errObj = {};
						if (e.errors) {
							e.errors.map((er) => {
								errObj[er.path] = er.message;
								let strMsg = er.message.substring(er.message.indexOf(".") + 1);
								return res.status(400).json({
									message: strMsg,
									responseData: {},
								});
							});
						} else {
							return res.status(400).json({
								message: e.message,
								responseData: {},
							});
						}
					});
			}
			else if (req.params["stats"] == "monthly") {
				const Op = Sequelize.Op;
				const NOW = new Date();
				let firstday = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
				sales.findAll({
					where: {
						createdAt: {
							[Op.gt]: firstday,
							[Op.lt]: new Date()
						}
					},
					order: [["createdAt", "ASC"]],
					returning: true,
				})
					.then((salesFindMonthlyResponse) => {
						if (salesFindMonthlyResponse.length > 0) {
							let monthObj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, 31: 0 }
							let total = 0;
							salesFindMonthlyResponse.map((singleRecord) => {
								let dateIs = singleRecord.dataValues.createdAt.getDate();
								monthObj[dateIs] += singleRecord.dataValues.amount;
								total += singleRecord.dataValues.amount
							});
							console.log("monthObj    =>", monthObj);

							return res.status(200).json({
								message: "get Monthly Sales successfuly",
								responseData: { DailyData: monthObj, MonthlyTotal: total },
							});
						} else {
							return res.status(400).json({
								message: "No record found to get Monthly Sales",
								responseData: salesFindMonthlyResponse,
							});
						}
					})
					.catch((e) => {
						const errObj = {};
						if (e.errors) {
							e.errors.map((er) => {
								errObj[er.path] = er.message;
								let strMsg = er.message.substring(er.message.indexOf(".") + 1);
								return res.status(400).json({
									message: strMsg,
									responseData: {},
								});
							});
						} else {
							return res.status(400).json({
								message: e.message,
								responseData: {},
							});
						}
					});
			}
			else{
				return res.status(400).json({
					message: "get stats Sales failed! Invalid Parameter",
					responseData: {},
				});
			}
		}
	},
};