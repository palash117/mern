const jwt = require("jsonwebtoken");
const config = require("config");

var auth = (req, res, next) => {
	let token = req.header("x-auth");
	if (token == null || token == "") {
		return res
			.status(403)
			.json({ errors: [{ msg: "AUTH TOKEN MISSING" }] });
	}
	try {
		let payload = jwt.verify(req.header("x-auth"), config.get("jwtSecret"));
		userData = { id: payload.id };
		req.user = userData;
		next();
	} catch (err) {
		console.log(err);
		return res.status(403).json({ errors: [{ msg: "INVALID TOKEN" }] });
	}
};

module.exports = auth;
