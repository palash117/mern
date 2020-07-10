const express = require("express");
const authentication = require("../middleware/auth");
const Profiles = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const Users = require("../../models/Users");
const config = require("config");
const request = require("request");

const router = express.Router();

var getGithubRepos = async (req, res) => {
	let githubUserName = req.params.username;
	try {
		let options = {
			uri: `https://api.github.com/users/${githubUserName}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				"githubClientId"
			)}&client_secret=${config.get("githubClientSecret")}`,
			method: "GET",
			headers: { "user-agent": "node.js" },
		};
		request(options, (error, response, body) => {
			if (response.statusCode != 200) {
				console.error(response);
				return res
					.status(500)
					.json({ errors: [{ msg: "UNABLE TO FETCH GITHUB REPO" }] });
			}
			res.status(200).json(JSON.parse(body));
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};
var deleteEducation = async (req, res) => {
	let education_id = req.params.education_id;
	let userId = req.user.id;
	try {
		let profile = await Profiles.findOne({ user: userId });
		if (profile == null) {
			return res
				.status(400)
				.json({ errors: [{ msg: "PROFILE NOT FOUND" }] });
		}
		profile.education = profile.education.filter(
			(ed) => ed.id != education_id
		);
		await profile.save();
		return res.status(200).json(profile);
	} catch (err) {
		console.error(error);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};
var addEducation = async (req, res) => {
	const { school, degree, fieldOfStudy, from, to, description } = req.body;
	const userId = req.user.id;
	const educationFields = {};
	if (school) educationFields.school = school;
	if (degree) educationFields.degree = degree;
	if (fieldOfStudy) educationFields.fieldOfStudy = fieldOfStudy;
	if (from) educationFields.from = from;
	if (to) educationFields.to = to;
	if (description) educationFields.description = description;

	try {
		let profile = await Profiles.findOne({ user: userId });
		if (profile == null) {
			return res
				.status(400)
				.json({ errors: [{ msg: "PROFILE NOT FOUND" }] });
		}
		profile.education.push(educationFields);
		await profile.save();
		return res.status(200).json(profile);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

var deleteExperience = async (req, res) => {
	userId = req.user.id;
	experienceId = req.params.experience_id;
	try {
		let profile = await Profiles.findOne({ user: userId });
		if (profile == null) {
			return res
				.status(400)
				.json({ errors: [{ msg: "PROFILE NOT FOUND" }] });
		}
		profile.experience = profile.experience.filter(
			(e) => e.id != experienceId
		);
		await profile.save();
		return res.status(200).json(profile);
	} catch (err) {
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

var addExperience = async (req, res) => {
	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	try {
		profile = await Profiles.findOne({ user: req.user.id });
		const {
			title,
			company,
			location,
			from,
			to,
			description,
			current,
		} = req.body;

		if (profile == null) {
			return res
				.status(400)
				.json({ errors: [{ msg: "PROFILE NOT FOUND" }] });
		}
		let experience = {};
		if (title) experience.title = title;
		if (company) experience.company = company;
		if (from) experience.from = from;
		if (to) experience.to = to;
		if (description) experience.description = description;
		if (current) experience.current = current;
		if (location) experience.location = location;

		profile.experience.push(experience);
		await profile.save();
		return res.status(200).json(profile);
	} catch (error) {
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

var deleteProfile = async (req, res) => {
	try {
		let id = req.user.id;
		await Profiles.findOneAndRemove({ user: id });
		await Users.findByIdAndRemove({ _id: id });
		return res.status(204).json();
	} catch (error) {
		console.log(err);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

var getProfileByUserId = async (req, res) => {
	try {
		const profile = await Profiles.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res
				.status(400)
				.json({ errors: [{ msg: "PROFILE NOT FOUND" }] });
		}
		res.status(200).json(profile);
	} catch (err) {
		console.log(err);
		if (err.kind == "ObjectId") {
			return res
				.status(400)
				.json({ errors: [{ msg: "PROFILE NOT FOUND" }] });
		}
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};
var getAllProflies = async (req, res) => {
	try {
		let profiles = await Profiles.find().populate("user", [
			"name",
			"avatar",
		]);
		res.status(200).json(profiles);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};
const getProfile = async (req, res) => {
	let userId = req.user.id;
	try {
		let profile = await Profiles.findOne({ user: userId });

		if (profile == null) {
			return res
				.status(404)
				.json({ errors: [{ msg: "profile missing" }] });
		}
		profile.populate("user", ["name", "avatar"]);
		return res.status(200).json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

var postProfile = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		social,
	} = req.body;
	const { youtube, facebook, twitter, instagram, linkedin } = social;
	const profileFields = {};
	profileFields.user = req.user.id;
	if (company) profileFields.company = company;
	if (website) profileFields.website = website;
	if (location) profileFields.location = location;
	if (bio) profileFields.bio = bio;
	if (status) profileFields.status = status;
	if (githubusername) profileFields.githubusername = githubusername;
	if (skills)
		profileFields.skills = skills.split(",").map((skill) => skill.trim());
	if (social) {
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;
	}

	try {
		let profile = await Profiles.findOne({ user: req.user.id });
		let profileSaveData;
		if (profile != null) {
			profile = await Profiles.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);
		} else {
			profile = new Profiles(profileFields);
			await profile.save();
		}
		return res.status(200).json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}

	// return res.status(await Profiles.findOne({user:req.user.id})
	//
};

// @route   GET api/profile/me
// @desc    get current user's profile
// @access  public
router.get("/me", authentication, getProfile);

// @route   GET api/profile/me
// @desc    get current user's profile
// @access  Private
router.post(
	"/",
	[
		authentication,
		check("status", "Status is incomplete").not().isEmpty(),
		check("skills", "Skills is required").not().isEmpty(),
	],
	postProfile
);

// @route   GET api/profile/
// @desc    get all profiles
// @access  public
router.get("/", getAllProflies);

// @route   GET api/profile/user/:user_id
// @desc    get a user's profile
// @access  public
router.get("/user/:user_id", getProfileByUserId);

// @route   DELETE api/profile/
// @desc    get a user's profile
// @access  private
router.delete("/", authentication, deleteProfile);

// @route   PUT api/profile/experience
// @desc    add user profile experience
// @access  private
router.put(
	"/experience",
	[
		authentication,
		check("title", "title is empty").not().isEmpty(),
		check("company", "company is empty").not().isEmpty(),
		check("description", "description is empty").not().isEmpty(),
		check("from", "from should be date").isISO8601(),
	],
	addExperience
);

// @route   DELETE api/profile/experience/:experience_id
// @desc    delete a user's profile experience
// @access  private
router.delete("/experience/:experience_id", authentication, deleteExperience);

// @route   PUT api/profile/education
// @desc    add user profile education
// @access  private
router.put(
	"/education",
	[
		authentication,
		check("school", "school is empty").not().isEmpty(),
		check("degree", "degree is empty").not().isEmpty(),
		check("from", "from should be date").isISO8601(),
		check("to", "to should be date").isISO8601(),
	],
	addEducation
);

// @route   DELETE api/profile/education/:education_id
// @desc    delete a user's profile education
// @access  private
router.delete("/education/:education_id", authentication, deleteEducation);

// @route   GET api/profile/githubRepos/:username
// @desc    get top 5 github repos
// @access  public
router.get("/githubRepos/:username", getGithubRepos);

module.exports = router;
