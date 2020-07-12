import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGithubRepos } from "../../actions/profile";

function ProfileGithub({ username, getGithubRepos, repos, githubFetchError }) {
	useEffect(() => {
		getGithubRepos(username);
	}, [getGithubRepos]);

	const getRepos = () => {
		if (repos && repos.length > 0) {
			return repos.map((repo, index) => {
				return (
					<div key={index} className="repo bg-white p-1 my">
						<div>
							<h4>
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{repo.name}
								</a>
								{repo.description && <p>{repo.description}</p>}
							</h4>
						</div>
						<div>
							<ul>
								<li className="badge badge-primary">
									Stars:{repo.stargazers_count}
								</li>
								<li className="badge badge-dark">
									Watchers:{repo.watchers_count}
								</li>
								<li className="badge badge-light">
									Forks:{repo.forks_count}
								</li>
							</ul>
						</div>
					</div>
				);
			});
		} else return "";
	};
	return githubFetchError ? (
		""
	) : (
		<div className="profile-github">
			<h2 className="text-primary my1">Github Repos</h2>
			{getRepos()}
		</div>
	);
}

const mapReduxStateToProps = (reduxState) => ({
	repos: reduxState.profile.repos,
	githubFetchError: reduxState.profile.githubFetchError,
});
ProfileGithub.propTypes = {
	repos: PropTypes.array.isRequired,
};
export default connect(mapReduxStateToProps, { getGithubRepos })(ProfileGithub);
