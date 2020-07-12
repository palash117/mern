import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OtherProfile = ({
	match,
	profile,
	loading,
	getProfileById,
	isAuthenticated,
	user,
}) => {
	let id = match.params.id;
	useEffect(() => {
		getProfileById(id);
	}, [getProfileById]);
	return (
		<div>
			<Link className="btn btn-light" to="/developers">
				Back
			</Link>
			{isAuthenticated && user && user.id === id ? (
				<Link className="btn btn-dark" to="/edit-profile">
					EditProfile
				</Link>
			) : (
				""
			)}
		</div>
	);
};

OtherProfile.propTypes = {
	prop: PropTypes,
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
	loading: state.profile.loading,
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
