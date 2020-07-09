import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	onchange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	onsubmit = async (event) => {
		event.preventDefault();
		console.log("success");
		const { email, password } = formData;
		login({ email, password });
	};
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign in</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Create Your Account
				</p>
				<form className="form" action="create-profile.html">
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							minLength="6"
							value={password}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary"
						value="Login"
						onSubmit={(e) => onsubmit(e)}
					/>
				</form>
				<p className="my-1">
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</section>
		</Fragment>
	);
};
Login.prototypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (reduxState) => ({
	isAuthenticated: reduxState.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
