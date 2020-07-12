import React, { Component, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getProfiles, clearCurrentProfile } from "../../actions/profile";
import Spinner from "../Spinner";
import SingleProfile from "./SingleProfile";

const Profiles = ({
	profile: { profiles, loading },
	getProfiles,
	clearCurrentProfile,
}) => {
	useEffect(() => {
		getProfiles();
		clearCurrentProfile();
	}, []);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large test-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"></i> Browse and
						connect with developers
					</p>
					<div className="profiles">
						{profiles && profiles.length > 0 ? (
							profiles.map((p) => {
								return (
									<SingleProfile key={p._id} profile={p} />
								);
							})
						) : (
							<h4>No profiles found...</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (reduxState) => ({
	profile: reduxState.profile,
});

const mapDispatchToProps = { getProfiles, clearCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
