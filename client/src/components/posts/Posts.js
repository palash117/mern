import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts, clearPosts } from "../../actions/posts";
import Spinner from "../Spinner";
import PostItem from "./PostItem";
import CreatePost from "./CreatePost";

const Posts = ({ postsData, loading, getPosts, clearPosts }) => {
	useEffect(() => {
		getPosts();
		return () => {
			// clearPosts();
		};
	}, [getPosts]);

	if (postsData) {
		return (
			<div>
				{loading ? (
					<Spinner></Spinner>
				) : (
					<Fragment>
						<CreatePost />
						<h1>Posts</h1>
						<p className="lead">
							<i className="fas fa-user">
								Welcome to the community
							</i>
						</p>
						{postsData.map((post) => (
							<PostItem
								key={post._id + post.likecount}
								post={post}
							></PostItem>
						))}
					</Fragment>
				)}
			</div>
		);
	}
	return <Spinner></Spinner>;
};

Posts.propTypes = {
	prop: PropTypes,
};

const mapStateToProps = (reduxState) => ({
	postsData: reduxState.posts.postsData,
	loading: reduxState.posts.loading,
});

const mapDispatchToProps = { getPosts, clearPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
