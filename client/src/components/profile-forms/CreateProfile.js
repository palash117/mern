import React, { useState, Fragment } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

export const CreateProfile = () => {
	const [state, setState] = useState({
		skills: [],
		company: "",
		website: "",
		location: "",
		bio: "",
		status: "",
		githubusername: "",
		experience: [],
		education: [],
		social: {
			twitter: "",
			youtube: "",
			linkedin: "",
			facebook: "",
			instagram: "",
		},
		addSocialLinks: true,
	});
	const {
		skills,
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		experience,
		education,
		addSocialLinks,
	} = state;
	const { youtube, linkedin, twitter, instagram, facebook } = state.social;
	onchange = (e) => {
		console.log(e);
		switch (e.target.name) {
			case "youtube":
			case "linkedin":
			case "twitter":
			case "instagram":
			case "facebook":
				setState({
					...state,
					social: {
						...state.social,
						[e.target.name]: [e.target.value],
					},
				});
			default:
				setState({
					...state,
					[e.target.name]: [e.target.value],
				});
		}
		console.log(state);
	};
	let toggleAddSocial = () => {
		setState({ ...state, addSocialLinks: !addSocialLinks });
	};
	return (
		<Fragment>
			<h1 className="large text-primary">Create Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Let's get some information to
				make your profile stand out
			</p>
			<small>* = required field</small>
			<form className="form">
				<div className="form-group">
					<select name="status" value={status} onChange={onchange}>
						<option value="0">* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">
							Junior Developer
						</option>
						<option value="Senior Developer">
							Senior Developer
						</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">
							Student or Learning
						</option>
						<option value="Instructor">
							Instructor or Teacher
						</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						value={company}
						onChange={onchange}
					/>
					<small className="form-text">
						Could be your own company or one you work for
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						name="website"
						value={website}
						onChange={onchange}
					/>
					<small className="form-text">
						Could be your own or a company website
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onchange}
					/>
					<small className="form-text">
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						value={skills}
						onChange={onchange}
					/>
					<small className="form-text">
						Please use comma separated values (eg.
						HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Github Username"
						name="githubusername"
						value={githubusername}
						onChange={onchange}
					/>
					<small className="form-text">
						If you want your latest repos and a Github link, include
						your username
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={onchange}
					></textarea>
					<small className="form-text">
						Tell us a little about yourself
					</small>
				</div>

				<div className="my-2">
					<button
						type="button"
						className="btn btn-light"
						onClick={toggleAddSocial}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{addSocialLinks ? (
					<Fragment>
						<div className="form-group social-input">
							<i className="fab fa-twitter fa-2x"></i>
							<input
								type="text"
								placeholder="Twitter URL"
								name="twitter"
								value={twitter}
								onChange={onchange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-facebook fa-2x"></i>
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								value={facebook}
								onChange={onchange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-youtube fa-2x"></i>
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								value={youtube}
								onChange={onchange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-linkedin fa-2x"></i>
							<input
								type="text"
								placeholder="Linkedin URL"
								name="linkedin"
								value={linkedin}
								onChange={onchange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-instagram fa-2x"></i>
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								value={instagram}
								onChange={onchange}
							/>
						</div>
					</Fragment>
				) : (
					""
				)}
				<input type="submit" className="btn btn-primary my-1" />
				<a className="btn btn-light my-1" href="dashboard.html">
					Go Back
				</a>
			</form>
		</Fragment>
	);
};

// CreateProfile.propTypes = {
// 	prop: PropTypes,
// };

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(CreateProfile);
