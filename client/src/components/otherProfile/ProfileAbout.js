import React, { Fragment } from "react";

const ProfileAbout = ({
	profile: {
		bio,
		skills,
		user: { name },
	},
}) => {
	return (
		<Fragment>
			<div className="profile-about bg-light p-2">
				{bio && (
					<Fragment>
						<h2 className="text-primary">
							{name.trim().split(" ")[0]}'s Bio
						</h2>
						<p>{bio}</p>
					</Fragment>
				)}
				<div className="line"></div>
				{skills && (
					<Fragment>
						<h2 className="text-primary">Skill Set</h2>
						<div className="skills">
							{skills.map((s, index) => {
								return (
									<div key={index} className="p-1">
										<i className="fa fa-check"></i> {s}
									</div>
								);
							})}
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default ProfileAbout;
