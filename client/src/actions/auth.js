import {
	REGISTRATION_FAILIURE,
	REGISTRATION_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	USER_LOADED,
	USER_LOAD_FAILURE,
	LOGOUT,
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";
import { clearProfile } from "./profile";

export const login = ({ email, password }) => async (dispatch) => {
	let config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		let response = await axios.post(
			"/api/auth",
			{ email, password },
			config
		);
		if (response.status === 200) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token: response.data },
			});
			dispatch(loadUser(response.data));
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
		}
		dispatch({ type: LOGIN_FAILURE });
		console.error(err);
	}
};

export const register = ({ name, email, password }) => async (dispatch) => {
	let config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		let response = await axios.post(
			"/api/users",
			{ name, email, password },
			config
		);
		if (response.status === 200) {
			dispatch({ type: REGISTRATION_SUCCESS, payload: response.data });
		} else {
			if (response.data && response.data.errors) {
				response.data.errors.map((err) => setAlert(err.msg, "danger"));
			}
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
		}
		dispatch({ type: REGISTRATION_FAILIURE });
		console.error(err);
	}
};

export const loadUser = () => async (dispatch) => {
	let token = localStorage.getItem("token");
	if (!token) {
		return dispatch({ type: USER_LOAD_FAILURE });
	}
	let config = {
		headers: {
			"x-auth": token,
		},
	};
	try {
		let response = await axios.get("/api/auth", config);
		if (response.status === 200) {
			dispatch({ type: USER_LOADED, payload: response.data });
		} else {
			if (response.data && response.data.errors) {
				response.data.errors.map((err) => setAlert(err.msg, "danger"));
			}
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
		}
		dispatch({ type: USER_LOAD_FAILURE });
		console.error(err);
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	dispatch(clearProfile());
};

export const deleteUser = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
