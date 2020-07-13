import React, { useState } from "react";
import { addComment, deleteComment } from "../../actions/posts";
import { connect } from "react-redux";

const AddComment = ({ addComment, parentPostId }) => {
	const [message, setmessage] = useState("");
	let onChange = (e) => {
		setmessage(e.target.value);
	};
	let onSubmit = (e) => {
		e.preventDefault();
		addComment(message, parentPostId);
	};
	return (
		<div class="post-form">
			<div class="bg-primary p">
				<h3>Leave A Comment</h3>
			</div>
			<form class="form my-1">
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Comment on this post"
					required
					value={message}
					onChange={onChange}
				></textarea>
				<input
					type="submit"
					class="btn btn-dark my-1"
					value="Submit"
					onClick={onSubmit}
				/>
			</form>
		</div>
	);
};

export default connect(null, { addComment })(AddComment);
