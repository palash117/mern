import React, { Component, useEffect, Fragment } from "react";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const OtherProfile = ({
	match,
	profile,
	loading,
	getProfileById,
	isAuthenticated,
	user,
}) => {
	let id = match.params.id;
	var { education, experience, githubusername } = profile ? profile : {};
	if (!education) {
		education = [];
	}
	if (!experience) {
		experience = [];
	}
	useEffect(() => {
		getProfileById(id);
	}, [getProfileById]);
	return (
		<div>
			<Link className="btn btn-light" to="/developers">
				Back
			</Link>
			{isAuthenticated && user && user.id === id && (
				<Link className="btn btn-dark" to="/edit-profile">
					EditProfile
				</Link>
			)}
			{profile && (
				<div className="profile-grid my-1">
					<ProfileTop profile={profile} />
					<ProfileAbout profile={profile} />
					{experience.length > 0 && (
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{experience.length > 0 ? (
								<Fragment>
									{experience.map((exp) => {
										return (
											<ProfileExperience
												key={exp._id}
												exp={exp}
											/>
										);
									})}
								</Fragment>
							) : (
								<h4>No Experience yet</h4>
							)}
						</div>
					)}
					{education.length > 0 && (
						<div className="profile-edu bg-white p-2">
							<h2 className="text-primary">Education</h2>
							{education.length > 0 ? (
								<Fragment>
									{education.map((edu) => {
										return (
											<ProfileEducation
												key={edu._id}
												edu={edu}
											/>
										);
									})}
								</Fragment>
							) : (
								<h4>No Experience yet</h4>
							)}
						</div>
					)}
					{githubusername && (
						<ProfileGithub username={githubusername} />
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
	loading: state.profile.loading,
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
