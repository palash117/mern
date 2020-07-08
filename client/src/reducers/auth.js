import {
	REGISTRATION_FAILIURE,
	REGISTRATION_SUCCESS,
} from "../actions/actionTypes";

var initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case REGISTRATION_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
			};
			break;
		case REGISTRATION_FAILIURE:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				// user: null,
			};
			break;
		default:
			return state;
	}
}
