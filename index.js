const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

let models = require("./models/index");
let route = require("./routes/index");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", route);

// Setup server port
const port = process.env.PORT || 5000;
models.db.connection
	.sync({
		force: false,
		// alter: true,
		logging: false,
	})
	.then(() => {
		app.listen(port);
		console.log("server is listning on port => ", port);
	})
	.catch((err) => console.log(err));

	//404 handler
app.use(function (req, res, next) {
	//   console.error(err);
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
	return res.status(err.status || 500).json({
		message: err.message,
		responseData: {},
	});
});
