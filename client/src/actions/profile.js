import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

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
		if (response.status == 200) {
			// let profileData = JSON.parse(response.data);
			dispatch({ type: GET_PROFILE, payload: response.data });
		}
	} catch (err) {
		let errors = err.response.data.errors;
		if (!errors || errors.length <= 0) {
			console.log(err);
		}
		errors.map((err) => dispatch(setAlert(err.msg), "danger"));
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
