const mongoose = require("mongoose");
const Type = require("../util/LikeType");

function getLike(num) {
	switch (num) {
		case 0:
			return Type.LIKE;
		case 1:
			return Type.DISLIKE;
	}
}

function setLike(likeType) {
	switch (likeType) {
		case Type.LIKE:
			return 0;
		case Type.DISLIKE:
			return 1;
	}
}

const LikeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "post",
		required: true,
	},
	type: {
		type: Number,
		required: true,
		set: setLike,
		get: getLike,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Likes = mongoose.model("likes", LikeSchema);
