import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const { name, email, password, password2 } = formData;
	onchange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	onsubmit = async (event) => {
		event.preventDefault();
		if (password !== password2) {
			setAlert("passwords don't match", "danger");
		}
		console.log("success");
	};
	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Create Your Account
				</p>
				<form className="form" action="create-profile.html">
					<div className="form-group">
						<input
							type="text"
							placeholder="Name"
							name="name"
							required
							value={name}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={(e) => onchange(e)}
						/>
						<small className="form-text">
							This site uses Gravatar so if you want a profile
							image, use a Gravatar email
						</small>
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
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm Password"
							name="password2"
							minLength="6"
							value={password2}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary"
						value="Register"
						onSubmit={(e) => onsubmit(e)}
					/>
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</section>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(Register);
