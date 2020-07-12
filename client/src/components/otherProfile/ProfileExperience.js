import React from "react";
import Moment from "react-moment";
const ProfileExperience = ({
	exp: { company, description, from, to, title },
}) => {
	return (
		<div>
			<h3 className="text-dark">{company}</h3>
			<p>
				<Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
				{!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
			</p>
			<p>
				<strong>Possition:</strong> {title}
			</p>
			<p>
				<strong>Description:</strong>
				{description}
			</p>
		</div>
	);
};

export default ProfileExperience;
