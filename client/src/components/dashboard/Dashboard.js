import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const Dashboard = ({ getProfile, profile, error, loading, user }) => {
	useEffect(() => {
		getProfile();
	}, []);
	if (loading) {
		return <Spinner />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" />
				Welcome {user && user.name ? user.name : ""}
			</p>
			{profile !== null ? (
				<Fragment>has</Fragment>
			) : (
				<Fragment>
					<p>
						You have not yet setup a profile, please add some info
					</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};
Dashboard.propTypes = {
	getProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
};
const mapReduxStateToProps = (reduxState) => ({
	profile: reduxState.profile.profile,
	error: reduxState.profile.error,
	loading: reduxState.profile.loading,
	user: reduxState.auth.user,
});
export default connect(mapReduxStateToProps, { getProfile })(Dashboard);
