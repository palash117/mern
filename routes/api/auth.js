const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../../models/Users");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const authentication = require("../middleware/auth");

let auth = async (req, res) => {
	const { email, password } = req.body;

	let user = await Users.findOne({ email });
	if (user == null) {
		return res
			.status(401)
			.json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
	}

	try {
		let isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(401)
				.json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
		}

		const payload = {
			id: user.id,
		};
		token = await jwt.sign(payload, config.get("jwtSecret"), {
			expiresIn: 360000,
		});
		res.status(200).send(token);
	} catch (err) {
		console.log(err);
		res.res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

var getUser = async (req, res) => {
	let userId = req.user.id;
	if (userId != null) {
		let user = await Users.findById(userId);
		const { name, email, avatar, id } = user;
		return res.status(200).json({ name, email, avatar, id });
	}

	res.status(500).json({ errors: [{ msg: "INVALID TOKEN" }] });
};

// @route   POST api/auth
// @desc    Test route
// @access  Public
router.post(
	"/",
	[
		check("email", "email required").isEmail(),
		// check()
	],
	auth
);

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", authentication, getUser);

module.exports = router;
