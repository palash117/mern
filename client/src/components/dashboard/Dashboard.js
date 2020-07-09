import React, { useEffect } from "react";
import { getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Dashboard = ({ getProfile, profile, error, loading }) => {
	useEffect(() => {
		getProfile();
	}, []);
	if (!loading && profile && !error)
		return <div>{JSON.stringify(profile)}</div>;
	else return <div>Welcome to dashboard?</div>;
	// return <div>hello</div>;
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
});
export default connect(mapReduxStateToProps, { getProfile })(Dashboard);
