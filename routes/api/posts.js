const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const Posts = require("../../models/Posts");
const { check, validationResult } = require("express-validator");
const authentication = require("../middleware/auth");
const { DISLIKE } = require("../../util/LikeType");
const Likes = require("../../models/Like");
const LikeType = require("../../util/LikeType");

const addPost = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	const userId = req.user.id;
	const { message, isComment, parentPostId } = req.body;

	const postFields = {};
	postFields.message = message;
	if (isComment) {
		postFields.isComment = true;
		postFields.parent = parentPostId;
	} else {
		postFields.isComment = false;
	}
	postFields.isEdited = false;
	try {
		const user = await Users.findById(userId);
		if (!user) {
			return res
				.status(500)
				.json({ errors: [{ msg: "USER NOT FOUND" }] });
		}
		postFields.user = userId;
		postFields.username = user.name;
		postFields.avatar = user.avatar;

		const post = new Posts(postFields);
		await post.save();
		return res.status(200).json(post);
	} catch (err) {
		console.error(error);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

const updatePost = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	const userId = req.user.id;
	const postId = req.params.post_id;

	try {
		const user = await Users.findById(userId);
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "USER NOT FOUND" }] });
		}
		const post = await Posts.findById(postId);
		if (!post) {
			return res
				.status(400)
				.json({ errors: [{ msg: "POST NOT FOUND" }] });
		}
		console.log(post.user.toString());
		if (user.id != post.user.toString()) {
			return res.status(403).json({ errors: [{ msg: "FORBIDDEN" }] });
		}
		post.message = req.body.message;
		post.isEdited = true;
		post.modifiedDate = new Date();
		// const post = new Posts(postFields);
		await post.save();
		return res.status(200).json(post);
	} catch (err) {
		console.error(error);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

// unsclable function , using skip for pagination is highly cpu intensive and not scalable
const getAllPosts = async (req, res) => {
	let pageNo = 1;
	let pageSize = 10;
	if (req.query.pageNo) {
		pageNo = parseInt(req.query.pageNo);
	}
	if (req.query.pageSize) {
		pageSize = parseInt(req.query.pageSize);
	}
	try {
		const posts = await Posts.find({ isComment: false })
			.limit(pageSize)
			.skip((pageNo - 1) * pageSize);
		return res.json(posts);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

const deletePost = async (req, res) => {
	const userId = req.user.id;
	const postId = req.params.post_id;

	try {
		const user = await Users.findById(userId);
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "USER NOT FOUND" }] });
		}
		const post = await Posts.findById(postId);
		if (!post) {
			return res
				.status(400)
				.json({ errors: [{ msg: "POST NOT FOUND" }] });
		}
		if (user.id != post.user.toString()) {
			return res.status(403).json({ errors: [{ msg: "FORBIDDEN" }] });
		}
		await Posts.findByIdAndDelete(post.id);
		return res.status(204).json();
	} catch (err) {
		console.error(error);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

const getChildPosts = async (req, res) => {
	let pageNo = 1;
	let pageSize = 10;
	if (req.query.pageNo) {
		pageNo = parseInt(req.query.pageNo);
	}
	if (req.query.pageSize) {
		pageSize = parseInt(req.query.pageSize);
	}
	let parentPostId = req.params.post_id;
	try {
		const post = await Posts.findById(parentPostId);
		const posts = await Posts.find({ parent: parentPostId })
			.limit(pageSize)
			.skip((pageNo - 1) * pageSize);
		const response = {
			parentPost: post,
			children: posts,
		};
		return res.json(response);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

const likePost = async (req, res) => {
	userId = req.user.id;
	postId = req.params.post_id;

	try {
		let user = await Users.findById(userId);
		if (!user) {
			return res
				.status(401)
				.json({ errors: [{ msg: "UNER NOT FOUND" }] });
		}
		let post = await Posts.findById(postId);
		if (!post) {
			return res
				.status(401)
				.json({ errors: [{ msg: "POST NOT FOUND" }] });
		}

		let like = await Likes.findOne({ user: userId, post: postId });
		if (like) {
			switch (like.type) {
				case LikeType.LIKE:
					break;
				case LikeType.DISLIKE:
					post.dislikeCount = post.dislikecount - 1;
					post.likecount = post.likecount + 1;
					like.type = LikeType.LIKE;
					await post.save();
					await like.save();
					break;
			}
		} else {
			like = new Likes({
				user: userId,
				post: postId,
				type: LikeType.LIKE,
			});
			post.likecount = post.likecount + 1;
			await post.save();
			await like.save();
		}
		return res.status(200).json(post);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

const dislikePost = async (req, res) => {
	userId = req.user.id;
	postId = req.params.post_id;

	try {
		let user = await Users.findById(userId);
		if (!user) {
			return res
				.status(401)
				.json({ errors: [{ msg: "UNER NOT FOUND" }] });
		}
		let post = await Posts.findById(postId);
		if (!post) {
			return res
				.status(401)
				.json({ errors: [{ msg: "POST NOT FOUND" }] });
		}

		let like = await Likes.findOne({ user: userId, post: postId });
		if (like) {
			switch (like.type) {
				case LikeType.LIKE:
					post.likecount = post.likecount - 1;
					post.dislikecount = post.dislikecount + 1;
					like.type = LikeType.DISLIKE;
					await post.save();
					await like.save();
					break;
				case LikeType.DISLIKE:
					break;
			}
		} else {
			like = new Likes({
				user: userId,
				post: postId,
				type: LikeType.DISLIKE,
			});
			post.likecount = post.dislikecount + 1;
			await post.save();
			await like.save();
		}
		return res.status(200).json(post);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: "INTERNAL SERVER ERROR" }] });
	}
};

// @route   GET api/posts
// @desc    getAllPosts
// @access  Public
router.get("/", getAllPosts);

// @route   GET api/posts/:post_id
// @desc    get comments
// @access  Public
router.get("/:post_id", getChildPosts);

// @route   post api/posts
// @desc    add post
// @access  Private
router.post(
	"/",
	[authentication, check("message", "message is empty").not().isEmpty()],
	addPost
);

// @route   put api/posts/:post_id
// @desc    add post
// @access  Private
router.put(
	"/:post_id",
	[authentication, check("message", "message is empty").not().isEmpty()],
	updatePost
);

// @route   delete api/posts/:post_id
// @desc    delete post
// @access  Private
router.delete("/:post_id", authentication, deletePost);

// @route   put api/posts/:post_id
// @desc    add post
// @access  Private
router.put("/like/:post_id", authentication, likePost);

// @route   put api/posts/:post_id
// @desc    add post
// @access  Private
router.put("/dislike/:post_id", authentication, dislikePost);

router.po;
module.exports = router;
