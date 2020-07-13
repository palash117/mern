import {
	GET_POSTS,
	POSTS_ERROR,
	CLEAR_POSTS,
	LIKE_POST,
	DISLIKE_POST,
	DELETE_POST,
	ADD_POST,
	GET_SINGLE_POST,
	CLEAR_SINGLE_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
} from "../actions/actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

const TOKEN = "token";
export const getPosts = (pageNo = 1, pageSize = 10) => async (dispatch) => {
	try {
		// let token = localStorage.getItem(TOKEN);
		// if (!token) {
		// 	return dispatch(setAlert("please login first", "danger"));
		// }
		let response = await axios.get(
			`/api/posts?pageNo=${pageNo}&pageSize=${pageSize}`
		);
		if (response.status == 200) {
			dispatch({ type: GET_POSTS, payload: response.data });
		}
	} catch (err) {
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};
export const clearPosts = () => (dispatch) => {
	dispatch({ type: CLEAR_POSTS });
};

export const likePost = (id) => async (dispatch) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		let config = {
			headers: {
				"x-auth": token,
				"Content-Type": "application/json",
			},
		};
		let response = await axios.put(`/api/posts/like/${id}`, {}, config);
		if (response.status == 200) {
			dispatch({ type: LIKE_POST, payload: response.data });
		}
	} catch (err) {
		//todo check posts-error
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};

export const dislikePost = (id) => async (dispatch) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		let config = {
			headers: {
				"x-auth": token,
				"Content-Type": "application/json",
			},
		};
		let response = await axios.put(`/api/posts/dislike/${id}`, {}, config);
		if (response.status == 200) {
			dispatch({ type: DISLIKE_POST, payload: response.data });
		}
	} catch (err) {
		//todo check posts-error
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		let config = {
			headers: {
				"x-auth": token,
			},
		};
		let response = await axios.delete(`/api/posts/${id}`, config);
		if (response.status == 204) {
			dispatch({ type: DELETE_POST, payload: id });
			dispatch(setAlert("Post deleted successfully", "success"));
		}
	} catch (err) {
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};

export const addPost = (message) => async (dispatch) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		let config = {
			headers: {
				"x-auth": token,
				"Content-Type": "application/json",
			},
		};
		if (!message || message.length === 0) {
			return dispatch(setAlert("Body of post can not be empty", "dark"));
		}
		let body = { message };
		let response = await axios.post(`/api/posts/`, body, config);
		if (response.status == 200) {
			dispatch({ type: ADD_POST, payload: response.data });
			dispatch(setAlert("Posted successfully", "success"));
		}
	} catch (err) {
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};

export const getPostById = (id) => async (dispatch) => {
	try {
		// let token = localStorage.getItem(TOKEN);
		// if (!token) {
		// 	return dispatch(setAlert("please login first", "danger"));
		// }
		// let config = {
		// 	headers: {
		// 		"x-auth": token,
		// 	},
		// };
		let response = await axios.get(`/api/posts/${id}`);
		if (response.status == 200) {
			dispatch({ type: GET_SINGLE_POST, payload: response.data });
		}
	} catch (err) {
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};

export const clearSinglePost = () => async (dispatch) => {
	dispatch({ type: CLEAR_SINGLE_POST });
};

export const addComment = (message, parentPostId) => async (dispatch) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		let config = {
			headers: {
				"x-auth": token,
				"Content-Type": "application/json",
			},
		};
		if (!message || message.length === 0) {
			return dispatch(setAlert("Body of post can not be empty", "dark"));
		}
		let body = { message, parentPostId, isComment: true };
		let response = await axios.post(`/api/posts/`, body, config);
		if (response.status == 200) {
			dispatch({ type: ADD_COMMENT, payload: response.data });
			dispatch(setAlert("Posted successfully", "success"));
		}
	} catch (err) {
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};
export const deleteComment = (id) => async (dispatch) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		let config = {
			headers: {
				"x-auth": token,
			},
		};
		let response = await axios.delete(`/api/posts/${id}`, config);
		if (response.status == 204) {
			dispatch({ type: DELETE_COMMENT, payload: id });
			dispatch(setAlert("Post deleted successfully", "success"));
		}
	} catch (err) {
		dispatch({ type: POSTS_ERROR });
		console.error(err);
		if (err.response && err.response.data) {
			let errors = err.response.data.errors;
			if (errors) {
				errors.map((err) => {
					return dispatch(setAlert(err.msg, "danger"));
				});
			}
		}
	}
};
