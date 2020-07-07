const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	username: {
		type: String,
		required: true,
	},

	avatar: {
		type: String,
		required: true,
	},
	isComment: {
		type: Boolean,
		required: true,
	},
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "post",
	},
	message: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isEdited: {
		type: Boolean,
		required: true,
	},
	modifiedDate: {
		type: Date,
	},
	likecount: {
		type: Number,
		default: 0,
	},
	dislikecount: {
		type: Number,
		default: 0,
	},
});

module.exports = Post = mongoose.model("post", PostSchema);
