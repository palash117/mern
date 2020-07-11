import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

function Education({ educationList, deleteEducation }) {
	let educations = educationList.map((ed) => {
		return (
			<Fragment key={ed.id}>
				<tr>
					<td>{ed.school}</td>
					<td>{ed.degree}</td>
					<td>
						<Moment format="YYYY/MM/DD">{ed.from}</Moment>
					</td>
					<td>
						{ed.to ? (
							<Moment format="YYYY/MM/DD">{ed.to}</Moment>
						) : (
							"Now"
						)}
					</td>
					<td>
						<button
							className="fas fa-trash  btn btn-danger"
							onClick={() => {
								deleteEducation({ id: ed._id });
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
						<th>School</th>
						<th>Degree</th>
						<th className="hide-sm">From </th>
						<th className="hide-sm">To</th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
}

Education.propTypes = {
	educationList: PropTypes.array.isRequired,
};

export default connect(null, { deleteEducation })(Education);
