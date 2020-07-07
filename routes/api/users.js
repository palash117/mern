const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");

var register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	} else {
		try {
			const { name, email, password } = req.body;

			// check user exists

			let user = await User.findOne({ email });
			console.log("user", user);

			if (user != null) {
				return res
					.status(400)
					.json({ errors: [{ msg: "email already used!" }] });
			}

			// get users gravatar
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			// encrypt password
			const salt = await bcrypt.genSalt(10);

			const hash = await bcrypt.hash(password, salt);

			// create user
			user = new User({ name, email, avatar, password: hash });

			user.save();

			// create jwt token
			const payload = { id: user.id };

			token = await jwt.sign(payload, config.get("jwtSecret"));

			res.json({ token });

			// return jsonwebtoken
			//todo
		} catch (err) {
			console.log(err);
			res.res
				.status(500)
				.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
		}
	}
};

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"please enter a password with more than 6 characters"
		).isLength({ min: 6 }),
	],
	register
);

module.exports = router;
