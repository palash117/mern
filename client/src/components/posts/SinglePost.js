import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPostById, clearSinglePost } from "../../actions/posts";
import Spinner from "../Spinner";
import AddComment from "./AddComment";
import Comment from "./Comment";

const SinglePost = (props) => {
	const { match, postData, getPostById, clearSinglePost } = props;
	const { parentPost, children } = postData ? postData : {};
	console.log(props);
	const postId = match.params.id;
	useEffect(() => {
		getPostById(postId);
		return () => {
			// clearSinglePost();
		};
	}, [getPostById]);
	if (postData === null) {
		return <Spinner></Spinner>;
	} else
		return (
			<Fragment>
				<div className="post bg-white p-1 my-1">
					<div>
						<a href="profile.html">
							<img
								className="round-img"
								src={parentPost.avatar}
								alt=""
							/>
							<h4>{parentPost.username}</h4>
						</a>
					</div>
					<div>
						<p className="my-1">{parentPost.message}</p>
					</div>
				</div>
				<AddComment parentPostId={parentPost._id}></AddComment>
				{children && children.length > 0 && (
					<div class="comments">
						{children.map((child) => {
							return <Comment {...child} />;
						})}
					</div>
				)}
			</Fragment>
		);
};

const mapStateToProps = (state) => ({ postData: state.posts.singlePost });

const mapDispatchToProps = { getPostById, clearSinglePost };

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
