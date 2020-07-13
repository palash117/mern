import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { likePost, dislikePost, deletePost } from "../../actions/posts";

const PostItem = ({
	auth,
	post: {
		_id,
		text,
		username,
		avatar,
		user,
		likecount,
		dislikecount,
		comments,
		date,
		message,
	},
	likePost,
	dislikePost,
	deletePost,
}) => {
	const showDeleteButton =
		auth && !auth.loading && auth.user && user === auth.user.id;
	return (
		<Fragment>
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/oprofile/${user}`}>
						<img className="round-img" src={avatar} alt="" />
						<h4>{username}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{message}</p>
					<p className="post-date">
						Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
					</p>
					<button
						type="button"
						className="btn btn-light"
						onClick={(e) => {
							likePost(_id);
						}}
					>
						<i className="fas fa-thumbs-up"></i>
						{likecount > 0 && <span> {likecount}</span>}
					</button>
					<button
						type="button"
						className="btn btn-light"
						onClick={(e) => {
							dislikePost(_id);
						}}
					>
						<i className="fas fa-thumbs-down"></i>
					</button>
					<Link to={`/opost/${_id}`} className="btn btn-primary">
						Discussion
					</Link>
					{showDeleteButton && (
						<button
							type="button"
							className="btn btn-danger"
							onClick={(e) => {
								deletePost(_id);
							}}
						>
							<i className="fas fa-times"></i>
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => ({
	auth: reduxState.auth,
});

export default connect(mapReduxStateToProps, {
	likePost,
	dislikePost,
	deletePost,
})(PostItem);
