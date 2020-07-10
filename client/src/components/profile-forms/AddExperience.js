import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import PropTypes from "prop-types";

const AddExperience = ({ addExperience, history }) => {
	/*
	title: {
			},
			company: {
			},
			location: {
			},
			from: {
			},
			to: {
			},
			current: {
			},
			description: {
			},
}
	*/
	const [formData, setFormData] = useState({
		title: "",
		company: "",
		location: "",
		from: null,
		to: null,
		current: false,
		description: "",
	});

	const {
		title,
		company,
		location,
		from,
		to,
		current,
		description,
	} = formData;
	let onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	let onSubmit = (e) => {
		e.preventDefault();
		addExperience({ experienceData: formData, history });
	};
	let toggleCurrent = (e) => {
		setFormData({
			...formData,
			current: !current,
		});
	};
	return (
		<Fragment>
			<h1 className="large text-primary">Add An Experience</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any
				developer/programming positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form className="form">
				<div className="form-group">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						required
						value={title}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						required
						value={company}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current ? "checked" : ""}
							onChange={toggleCurrent}
						/>{" "}
						Current Job
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						name="to"
						value={to}
						disabled={current ? "disabled" : ""}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Job Description"
						value={description}
						onChange={onChange}
					></textarea>
				</div>
				<input
					type="submit"
					className="btn btn-primary my-1"
					onClick={onSubmit}
				/>
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};
AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};
export default connect(null, { addExperience })(withRouter(AddExperience));
