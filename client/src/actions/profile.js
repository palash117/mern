import axios from "axios";
import { setAlert } from "./alert";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	CREATE_PROFILE,
	ADD_EDUCATION,
	ADD_EXPERIENCE,
	DELETE_EDUCATION,
	DELETE_EXPERIENCE,
	GET_PROFILES,
	CLEAR_CURRENT_PROFILE,
	GET_GITHUB_REPOS_ERROR,
	GET_GITHUB_REPOS,
} from "./actionTypes";

const TOKEN = "token";

export const getProfile = () => async (dispatch) => {
	let token = localStorage.getItem(TOKEN);
	if (!token) {
		dispatch(setAlert("Please login first!"), "danger");
		return;
	}
	try {
		let config = {
			headers: {
				"x-auth": token,
			},
		};
		let response = await axios.get("/api/profile/me", config);
		if (response.status === 200) {
			// let profileData = JSON.parse(response.data);
			dispatch({ type: GET_PROFILE, payload: response.data });
		}
	} catch (err) {
		let errors = err.response.data.errors;
		if (!errors || errors.length <= 0) {
			console.log(err);
		}
		// errors.map((err) => dispatch(setAlert(err.msg), "danger"));
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
		console.log(errors);
	}
};
export const clearProfile = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
};

export const clearCurrentProfile = () => (dispatch) => {
	dispatch({ type: CLEAR_CURRENT_PROFILE });
};

export const createProfile = ({ profileData, history, isEdit }) => async (
	dispatch
) => {
	try {
		let token = localStorage.getItem(TOKEN);
		if (!token) {
			return dispatch(setAlert("please login first", "danger"));
		}
		const config = {
			headers: {
				"x-auth": token,
				"Content-Type": "application/json",
			},
		};
		let response = await axios.post("/api/profile", profileData, config);
		if (response && response.status === 200) {
			history.push("/dashboard");
			dispatch({ type: CREATE_PROFILE, payload: response.data });
			dispatch(
				setAlert(
					`Profile ${isEdit ? "edited" : "created"} successfully`,
					"success"
				)
			);
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const getCurrentProfile = () => async (dispatch) => {
	dispatch(getProfile());
};
export const updateProfile = ({ profileData, history, isEdit }) => async (
	dispatch
) => {
	dispatch(createProfile({ profileData, history, isEdit }));
};

export const addEducation = ({ educationData, history }) => async (
	dispatch
) => {
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
		let response = await axios.put(
			"/api/profile/education",
			educationData,
			config
		);
		if (response.status === 200) {
			dispatch({ type: ADD_EDUCATION, payload: response.data });
			dispatch(setAlert("Educaton added successfully", "success"));
			history.push("/dashboard");
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const addExperience = ({ experienceData, history }) => async (
	dispatch
) => {
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
		let response = await axios.put(
			"/api/profile/experience",
			experienceData,
			config
		);
		if (response.status === 200) {
			dispatch({ type: ADD_EXPERIENCE, payload: response.data });
			dispatch(setAlert("Experience added successfully", "success"));
			history.push("/dashboard");
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const deleteExperience = ({ id }) => async (dispatch) => {
	///experience/:experience_id
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
		let response = await axios.delete(
			`/api/profile/experience/${id}`,
			config
		);
		if (response.status == 200) {
			dispatch({ type: DELETE_EXPERIENCE, payload: response.data });
			dispatch(setAlert("Expereince removed successfully", "success"));
			// dispatch()
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const deleteEducation = ({ id }) => async (dispatch) => {
	///experience/:experience_id
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
		let response = await axios.delete(
			`/api/profile/education/${id}`,
			config
		);
		if (response.status == 200) {
			dispatch({ type: DELETE_EDUCATION, payload: response.data });
			dispatch(setAlert("Education removed successfully", "success"));
			// dispatch()
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const deleteAccount = ({ history }) => async (dispatch) => {
	if (
		!window.confirm(
			"This can not be UNDONE, do you still wish to continue deleting your account?"
		)
	) {
		return;
	}
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
		let response = await axios.delete("/api/profile/", config);
		if (response.status === 204) {
			dispatch(clearProfile());
			dispatch(setAlert("Account deleted successfuly", "success"));
			history.push("/");
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};
export const getProfiles = () => async (dispatch) => {
	try {
		let response = await axios.get("/api/profile/");
		if (response.status === 200) {
			dispatch({ type: GET_PROFILES, payload: response.data });
		}
	} catch (err) {
		console.error(err);
		let errors = err.response.data.errors;
		if (errors) {
			errors.map((err) => {
				return dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const getProfileById = (id) => async (dispatch) => {
	try {
		let response = await axios.get(`/api/profile/user/${id}`);
		if (response.status === 200) {
			// let profileData = JSON.parse(response.data);
			dispatch({ type: GET_PROFILE, payload: response.data });
		}
	} catch (err) {
		let errors = err.response.data.errors;
		if (!errors || errors.length <= 0) {
			console.log(err);
		}
		// errors.map((err) => dispatch(setAlert(err.msg), "danger"));
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
		console.log(errors);
	}
};
export const getGithubRepos = (username) => async (dispatch) => {
	try {
		let response = await axios.get(`/api/profile/githubRepos/${username}`);
		if (response.status === 200) {
			// let profileData = JSON.parse(response.data);
			dispatch({ type: GET_GITHUB_REPOS, payload: response.data });
		}
	} catch (err) {
		let errors = err.response.data.errors;
		if (errors && errors.length >= 0) {
			dispatch({
				type: GET_GITHUB_REPOS_ERROR,
				payload: err[0].msg,
			});
		} else {
			dispatch({
				type: GET_GITHUB_REPOS_ERROR,
				payload: "UNABLE TO FETCH REPOS",
			});
		}
		console.log(errors);
	}
};
