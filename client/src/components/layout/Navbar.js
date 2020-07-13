import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ authState, logout, history }) => {
	const guestLinks = (
		<ul>
			<li>
				<Link to="/developers">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);
	const userLinks = (
		<ul>
			<li>
				<Link to="/developers">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"></i>
					<span className="hide-sm"> DashBoard</span>
				</Link>
			</li>
			<li>
				<Link
					to="#!"
					onClick={() => {
						logout(history);
					}}
				>
					<i className="fas fa-sign-out-alt"></i>
					<span className="hide-sm"> Logout</span>
				</Link>
			</li>
		</ul>
	);
	var links = authState.isAuthenticated ? userLinks : guestLinks;
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> DevConnector
				</Link>
			</h1>
			{links}
		</nav>
	);
};
Navbar.propTypes = {
	authState: PropTypes.object.isRequired,
};
const mapStateToProps = (reduxState) => ({
	authState: reduxState.auth,
});
export default connect(mapStateToProps, { logout })(withRouter(Navbar));
