const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");
// mongoose.connect(db);
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("mongoDB connected ...");
	} catch (err) {
		console.log("error while connecting to db", err);
		console.error(err.message);
		process.exit(1);
		s;
	}
};

module.exports = connectDB;
