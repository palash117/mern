import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Spinner from "../Spinner";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	if (auth.loading) {
		return <Spinner></Spinner>;
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				auth.isAuthenticated ? (
					<Component {...props} />
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
