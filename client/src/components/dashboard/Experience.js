import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

function Experience({ experienceList, deleteExperience }) {
	let experiences = experienceList.map((ex) => {
		return (
			<Fragment key={ex.id}>
				<tr>
					<td>{ex.company}</td>
					<td>{ex.title}</td>
					<td>
						<Moment format="YYYY/MM/DD">{ex.from}</Moment>
					</td>
					<td>
						{ex.to ? (
							<Moment format="YYYY/MM/DD">{ex.to}</Moment>
						) : (
							"Now"
						)}
					</td>
					<td>
						<button
							className="fas fa-trash btn btn-danger"
							onClick={() => {
								deleteExperience({ id: ex._id });
							}}
						></button>
					</td>
				</tr>
			</Fragment>
		);
	});
	return (
		<Fragment>
			<h2 className="my-2">Experience credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th className="hide-sm">From </th>
						<th className="hide-sm">To</th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
}

Experience.propTypes = {
	experienceList: PropTypes.array.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
