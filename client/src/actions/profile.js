import axios from "axios";
import { setAlert } from "./alert";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	CREATE_PROFILE,
} from "./actionTypes";

export const getProfile = () => async (dispatch) => {
	let token = localStorage.getItem("token");
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

export const createProfile = ({ profileData, history }) => async (dispatch) => {
	try {
		let token = localStorage.getItem("token");
		if (!token) {
			return setAlert("please login first", "danger");
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
export const updateProfile = ({ profileData, history }) => async (dispatch) => {
	dispatch(createProfile({ profileData, history }));
};
