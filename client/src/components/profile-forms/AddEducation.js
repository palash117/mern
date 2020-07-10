import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import PropTypes from "prop-types";

export const AddEducation = ({ addEducation, history }) => {
	/*
	{
    "school": "school2",
    "degree": "graduate2",
    "fieldOfStudy": "",
    "from": "2020-07-05T08:31:59.283Z",
    "to": "2020-07-05T08:31:59.283Z",
    "description": "super school"
}
	*/
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldOfStudy: "",
		from: null,
		to: null,
		description: "",
	});

	const { school, degree, fieldOfStudy, from, to, description } = formData;
	let onchange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	let onSubmit = (e) => {
		e.preventDefault();
		addEducation({ educationData: formData, history });
	};
	return (
		<Fragment>
			<h1 class="large text-primary">Add Your Education</h1>
			<p class="lead">
				<i class="fas fa-graduation-cap"></i> Add any school, bootcamp,
				etc that you have attended
			</p>
			<small>* = required field</small>
			<form class="form">
				<div class="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						name="school"
						required
						value={school}
						onChange={onchange}
					/>
				</div>
				<div class="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						required
						value={degree}
						onChange={onchange}
					/>
				</div>
				<div class="form-group">
					<input
						type="text"
						placeholder="Field Of Study"
						name="fieldOfStudy"
						value={fieldOfStudy}
						onChange={onchange}
					/>
				</div>
				<div class="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={onchange}
					/>
				</div>

				<div class="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						name="to"
						value={from}
						onChange={onchange}
					/>
				</div>
				<div class="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						value={description}
						onChange={onchange}
					></textarea>
				</div>
				<input
					type="submit"
					class="btn btn-primary my-1"
					onClick={onSubmit}
				/>
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};
AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};
export default connect(null, { addEducation })(withRouter(AddEducation));
