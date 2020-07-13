import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";

const CreatePost = ({ addPost }) => {
	const [message, setMessage] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		addPost(message);
		setMessage("");
	};
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form className="form my-1">
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					required
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				></textarea>
				<input
					type="submit"
					className="btn btn-dark my-1"
					value="Submit"
					onClick={onSubmit}
				/>
			</form>
		</div>
	);
};

const mapDispatchToProps = { addPost };

export default connect(null, mapDispatchToProps)(CreatePost);
