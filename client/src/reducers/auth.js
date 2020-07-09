import {
	REGISTRATION_FAILIURE,
	REGISTRATION_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	USER_LOADED,
	USER_LOAD_FAILURE,
	LOGOUT,
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
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
			};
		case USER_LOADED:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: payload,
			};
		case REGISTRATION_FAILIURE:
		case LOGIN_FAILURE:
		case USER_LOAD_FAILURE:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			};

		default:
			return state;
	}
}
