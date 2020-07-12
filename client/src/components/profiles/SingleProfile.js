import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function SingleProfile({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills,
	},
}) {
	return (
		<Fragment>
			<div className="profile bg-light">
				<img src={avatar} alt="" className="round-img" />
				<div>
					<h2>{name}</h2>
					<div>
						{status} {company && <span>at {company}</span>}
						<p className="my-1">
							{location && <span>{location}</span>}
						</p>
						<Link
							to={`/oprofile/${_id}`}
							className="btn btn-primary"
						>
							View Profiel
						</Link>
					</div>
				</div>
				<ul>
					{skills.slice(0, 4).map((skill, index) => (
						<li className="text-primary" key={index}>
							<i className="fa fa-check"> {skill}</i>
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	);
}

export default SingleProfile;
