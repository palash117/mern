import { REGISTRATION_FAILIURE, REGISTRATION_SUCCESS } from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

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
		errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
		dispatch({ type: REGISTRATION_FAILIURE });
		console.error(err);
	}
};
