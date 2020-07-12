import React from "react";
import Moment from "react-moment";
const ProfileEducation = ({
	edu: { school, degree, description, from, to, filed },
}) => {
	return (
		<div>
			<h3 className="text-dark">{school}</h3>
			<h4 className="text-dark">{degree}</h4>
			<p>
				<Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
				{!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
			</p>
			<p>
				<strong>Description:</strong>
				{description}
			</p>
		</div>
	);
};

export default ProfileEducation;
