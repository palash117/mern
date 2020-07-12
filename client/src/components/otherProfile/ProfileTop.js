import React, { Fragment } from "react";

const ProfileTop = ({
	profile: {
		user: { name, avatar },
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		experience,
		education,
		skills,
		social,
	},
}) => {
	const { twitter, youtube, facebook, linkedin, instagram } = social
		? social
		: {};
	return (
		<div className="profile-top bg-primary p-2">
			<img className="round-img my-1" src={avatar} alt="" />
			<h1 className="large">{name}</h1>
			{status && (
				<p className="lead">
					{status} {company && <span> at {company}</span>}
				</p>
			)}
			{location && <p>{location}</p>}
			<div className="icons my-1">
				{website && (
					<a href={website} target="_blank" rel="noopener noreferrer">
						<i className="fas fa-globe fa-2x"></i>
					</a>
				)}
				{social ? (
					<Fragment>
						{youtube ? (
							<a
								href={youtube}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-youtube fa-2x"></i>
							</a>
						) : (
							""
						)}
						{facebook && (
							<a
								href={facebook}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-facebook fa-2x"></i>
							</a>
						)}
						{twitter && (
							<a
								href={twitter}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-twitter fa-2x"></i>
							</a>
						)}
						{linkedin && (
							<a
								href={linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-linkedin fa-2x"></i>
							</a>
						)}
						{instagram && (
							<a
								href={instagram}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-instagram fa-2x"></i>
							</a>
						)}
					</Fragment>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ProfileTop;
