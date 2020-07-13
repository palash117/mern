import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addComment, deleteComment } from "../../actions/posts";
import { Link } from "react-router-dom";

const Comment = ({
	username,
	user,
	message,
	date,
	avatar,
	auth,
	_id,
	deleteComment,
}) => {
	return (
		<Fragment>
			<div class="post bg-white p-1 my-1">
				<div>
					<Link to={`/oprofile/${user}`}>
						<img className="round-img" src={avatar} alt="" />
						<h4>{username}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{message}</p>
					<p className="post-date">
						Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
					</p>
					{auth && auth.isAuthenticated && auth.user.id === user && (
						<button
							type="button"
							class="btn btn-danger fas fa-trash"
							onClick={() => deleteComment(_id)}
						></button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

const mapReduxStateToProps = (reduxState) => ({
	auth: reduxState.auth,
});
export default connect(mapReduxStateToProps, { deleteComment })(Comment);
