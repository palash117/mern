import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				auth.isAuthenticated ? (
					<Component props />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

const mapReduxStateToProps = (reduxState) => ({
	auth: reduxState.auth,
});
export default connect(mapReduxStateToProps)(PrivateRoute);
